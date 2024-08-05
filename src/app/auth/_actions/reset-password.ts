'use server';

import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import ResetPasswordSchema from '@/schemas/reset-password-schema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const resetPassword = async (values: z.infer<typeof ResetPasswordSchema>) => {
	const validatedFields = ResetPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { token, password } = validatedFields.data;

	try {
		// Check if reset token exists
		const resetToken = await db.resetPasswordToken.findFirst({
			where: { token },
		});
		if (!resetToken) {
			return { error: en.auth.INVALID_TOKEN };
		}

		// Check if user with current email exists
		const user = await db.user.findFirst({
			where: { email: resetToken.email },
		});
		if (!user) {
			return { error: en.auth.INVALID_TOKEN };
		}

		// Update user's password
		const hashedPassword = await bcrypt.hash(password, 10);
		await db.user.update({
			where: { email: resetToken.email },
			data: { password: hashedPassword },
		});

		// Delete the token
		await db.resetPasswordToken.deleteMany({
			where: { email: resetToken.email },
		});

		return { message: en.auth.PASSWORD_UPDATED };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default resetPassword;
