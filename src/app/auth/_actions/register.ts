'use server';

import { hashPassword } from '@/utils/bcrypt';
import db from '@/utils/db';
import { generateToken } from '@/utils/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import sendConfirmationEmail from './send-confirmation-email';

/**
 * Creates a new account if there are no issues.
 */
const register = async (formData: FormData) => {
	const email = formData.get('email')?.toString().trim();
	const password = formData.get('password')?.toString();

	// Validate email and password
	if (!email || email.length === 0 || !password || password.length === 0) return;

	if (password.length < 6) {
		return { error: 'Password must be at least 6 characters long.' };
	}

	const existingUser = await db.user.findUnique({ where: { email } });

	// Email taken
	if (existingUser) {
		return { error: 'This email is already taken.' };
	}

	const hashedPassword = await hashPassword(password);

	// Create user
	const user = await db.user.create({
		data: {
			email,
			password: hashedPassword,
		},
	});

	// Generate JWT
	const token = await generateToken({ id: user.id });

	// Send confirmation email
	sendConfirmationEmail(email);

	// Automatically log new user in
	const cookieStore = await cookies();
	cookieStore.set('authToken', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7,
	});

	redirect('/calendar');
};

export default register;
