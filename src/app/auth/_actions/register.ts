'use server';

import login from '@/app/auth/_actions/login';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import RegisterSchema from '@/schemas/register-schema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import sendConfirmationEmail from './send-confirmation-email';

const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { email, password, confirmPassword } = validatedFields.data;

	if (password !== confirmPassword) {
		return { error: en.auth.PASSWORDS_DO_NOT_MATCH };
	}

	try {
		// Email taken:
		const existingUser = await db.user.findUnique({ where: { email } });
		if (existingUser) {
			return { error: en.auth.EMAIL_TAKEN };
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await db.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		await db.settings.create({
			data: {
				userId: user.id,
				language: 'en',
			},
		});

		await sendConfirmationEmail({ email });

		return { message: en.auth.CONFIRMATION_EMAIL_SENT };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default register;
