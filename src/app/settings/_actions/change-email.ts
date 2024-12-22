'use server';

import sendConfirmationEmail from '@/app/auth/_actions/send-confirmation-email';
import { getAuthStatus } from '@/lib/auth';
import { comparePasswords } from '@/lib/bcrypt';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';

const changeEmail = async (_prevState: any, formData: FormData): Promise<{ message?: string; error?: string }> => {
	const email = formData.get('email')?.toString(); // New email
	const password = formData.get('password')?.toString(); // Current password

	if (!email || !password) {
		return { error: en.INVALID_DATA };
	}

	try {
		const { authenticated, user: authUser } = await getAuthStatus();

		// Only authenticated users can change their email
		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		// Check if user exists, should not occur in normal conditions
		const user = await db.user.findUnique({
			where: { id: authUser.id },
			select: { password: true, email: true },
		});
		if (!user) {
			return { error: en.auth.USER_DOES_NOT_EXIST };
		}

		// Check if new email is the same
		if (user.email === email) {
			return { error: en.auth.EMAIL_IS_IDENTICAL };
		}

		// Check if password is correct
		const passwordsMatch = await comparePasswords(password, user.password);
		if (!passwordsMatch) {
			return { error: en.auth.WRONG_PASSWORD };
		}

		// Check if email is not taken
		const userWithEmail = await db.user.findUnique({ where: { email } });
		if (userWithEmail) {
			return { error: en.auth.EMAIL_TAKEN };
		}

		// Delete tokens associated with old email
		await db.verificationToken.deleteMany({ where: { email: user.email } });
		await db.resetPasswordToken.deleteMany({
			where: { email: user.email },
		});

		// Update email & reset their email confirmed
		await db.user.update({
			where: { id: authUser.id },
			data: { email, emailVerified: null },
		});

		// Users must verify their new email
		sendConfirmationEmail(email);

		return { message: en.auth.EMAIL_UPDATED };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default changeEmail;
