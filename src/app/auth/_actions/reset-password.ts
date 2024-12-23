'use server';

import db from '@/utils/db';
import { generateToken } from '@/utils/jwt';
import bcryptjs from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

/**
 * An action invoked after form submission in /auth/reset-password. It updates user's password and logs they in. Only available after requesting recovery email when user has forgotten their password.
 */
const resetPassword = async (formData: FormData) => {
	const password = formData.get('password')?.toString();
	const email = formData.get('email')?.toString();
	const token = formData.get('token')?.toString();

	// Validate the password
	if (!email || email.length === 0 || !password || password.length === 0) return;

	// Token is missing
	if (!token) {
		redirect('/auth/reset-password/invalid-token');
	}

	const resetToken = await db.resetPasswordToken.findFirst({
		where: { token },
	});

	// Token doesn't exist in the db
	if (!resetToken) {
		redirect('/auth/reset-password/invalid-token');
	}

	// Token is not associated with the email
	if (resetToken.email !== email) {
		redirect('/auth/reset-password/forbidden');
	}

	// Check if user with current email exists
	const user = await db.user.findFirst({
		where: { email: resetToken.email },
	});
	if (!user) {
		redirect('/auth/reset-password/forbidden');
	}

	// Update user's password
	const hashedPassword = await bcryptjs.hash(password, 10);
	await db.user.update({
		where: { email: resetToken.email },
		data: { password: hashedPassword },
	});

	// Delete token
	await db.resetPasswordToken.deleteMany({
		where: { email: resetToken.email },
	});

	// Generate JWT
	const jwtToken = await generateToken({ id: user.id });

	// Automatically sign user in
	const cookieStore = await cookies();
	cookieStore.set('authToken', jwtToken, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
	});

	redirect('/calendar');
};

export default resetPassword;
