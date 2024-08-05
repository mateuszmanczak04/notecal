'use server';

import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { z } from 'zod';
import sendResetPasswordEmail from './send-reset-password-email';

const ForgotPasswordSchema = z
	.string()
	.email()
	.min(1, { message: en.auth.EMAIL_REQUIRED });

const forgotPassword = async (values: z.infer<typeof ForgotPasswordSchema>) => {
	const validatedFields = ForgotPasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: validatedFields.error.errors[0].message };
	}

	const email = validatedFields.data;

	try {
		// Check if user exists and has email verified,
		// if not, fake that action resolved successfully
		const user = await db.user.findUnique({ where: { email } });
		if (!user || !user.emailVerified)
			return { message: en.auth.RESET_PASSWORD_EMAIL_SENT };

		// Send email and return potential errors
		const res = await sendResetPasswordEmail(email);
		if (res.error) {
			return { error: res.error };
		}

		return { message: en.auth.RESET_PASSWORD_EMAIL_SENT };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default forgotPassword;
