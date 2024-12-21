'use server';

import { hashPassword } from '@/lib/bcrypt';
import db from '@/lib/db';
import { generateToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import sendConfirmationEmail from '../_actions/send-confirmation-email';

/**
 * Creates a new account if there are no issues.
 */
const register = async (formData: FormData) => {
	const email = formData.get('email')?.toString().trim();
	const password = formData.get('password')?.toString();

	// Validate email and password
	if (!email || email.length === 0 || !password || password.length === 0) return;

	if (password.length < 6) {
		redirect('/auth/register?error=Password must be at least 6 characters long.');
	}

	const existingUser = await db.user.findUnique({ where: { email } });

	// Email taken
	if (existingUser) {
		redirect('/auth/register?error=This email is already taken.');
	}

	const hashedPassword = await hashPassword(password);

	// Create user
	const user = await db.user.create({
		data: {
			email,
			password: hashedPassword,
		},
	});

	// Create user's settings
	await db.settings.create({
		data: {
			userId: user.id,
			language: 'en',
		},
	});

	// Generate JWT
	const token = await generateToken({ id: user.id });

	// Send confirmation email
	sendConfirmationEmail({ email });

	// Automatically log new user in
	const cookieStore = await cookies();
	cookieStore.set('authToken', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
	});

	redirect('/calendar');
};

export default register;
