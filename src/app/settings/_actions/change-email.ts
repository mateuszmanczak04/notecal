'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import ChangeEmailSchema from '@/schemas/change-email-schema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import sendEmailChangeEmail from './send-change-email-email';

const changeEmail = async (values: z.infer<typeof ChangeEmailSchema>) => {
	const validatedFields = ChangeEmailSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { password, email } = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		// Check if user exists
		const user = await db.user.findUnique({
			where: { id: session.user.id },
			select: { password: true, email: true },
		});
		if (!user) {
			return { error: en.auth.USER_DOES_NOT_EXIST };
		}

		// Check if email is not the same
		if (user.email === email) {
			return { error: en.auth.EMAIL_IS_IDENTICAL };
		}

		// Check if password is correct
		const passwordsMatch = await bcrypt.compare(password, user.password);
		if (!passwordsMatch) {
			return { error: en.auth.WRONG_PASSWORD };
		}

		// Check if email is not taken
		const userWithEmail = await db.user.findUnique({ where: { email } });
		if (userWithEmail) {
			return { error: en.auth.EMAIL_TAKEN };
		}

		// Delete old tokens
		await db.verificationToken.deleteMany({ where: { email: user.email } });
		await db.resetPasswordToken.deleteMany({
			where: { email: user.email },
		});

		// Update email & reset their email confirmed
		await db.user.update({
			where: { id: session.user.id },
			data: { email, emailVerified: null },
		});

		await sendEmailChangeEmail({ email });

		return { message: en.auth.EMAIL_UPDATED };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default changeEmail;
