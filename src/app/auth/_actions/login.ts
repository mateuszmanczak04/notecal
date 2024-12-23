'use server';

import { comparePasswords } from '@/utils/bcrypt';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { generateToken } from '@/utils/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const login = async (formData: FormData) => {
	const email = formData.get('email')?.toString().trim();
	const password = formData.get('password')?.toString();

	if (!email || email.length === 0 || !password || password.length === 0) {
		redirect(`/auth/login?error=${en.INVALID_CREDENTIALS}`);
	}

	const user = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		redirect(`/auth/login?error=${en.INVALID_CREDENTIALS}`);
	}

	if (!comparePasswords(password, user.password)) {
		redirect(`/auth/login?error=${en.INVALID_CREDENTIALS}`);
	}

	// Generate JWT
	const token = await generateToken({ id: user.id });

	const cookieStore = await cookies();
	cookieStore.set('authToken', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
	});

	redirect('/calendar');
};

export default login;
