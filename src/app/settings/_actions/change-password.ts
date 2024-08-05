'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import ChangePasswordSchema from '@/schemas/change-password-schema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const changePassword = async (values: z.infer<typeof ChangePasswordSchema>) => {
	const validatedFields = ChangePasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { oldPassword, newPassword } = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const user = await db.user.findUnique({
			where: { id: session.user.id },
			select: { password: true },
		});

		if (!user || !user.password) {
			return { error: en.auth.USER_DOES_NOT_EXIST };
		}

		const passwordsMatch = await bcrypt.compare(oldPassword, user.password);

		if (!passwordsMatch) {
			return { error: en.auth.WRONG_PASSWORD };
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await db.user.update({
			where: { id: session.user.id },
			data: { password: hashedPassword },
		});

		return { message: en.auth.PASSWORD_UPDATED };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default changePassword;
