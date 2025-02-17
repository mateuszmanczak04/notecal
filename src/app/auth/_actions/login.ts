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
		return { error: en.INVALID_CREDENTIALS };
	}

	const user = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		return { error: en.INVALID_CREDENTIALS };
	}

	if (!(await comparePasswords(password, user.password))) {
		return { error: en.INVALID_CREDENTIALS };
	}

	// Generate JWT
	const token = await generateToken({ id: user.id });

	const cookieStore = await cookies();
	cookieStore.set('authToken', token, {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 60 * 24 * 7,
	});

	redirect('/calendar');
};

export default login;
