'use server';

import { signIn } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import LoginSchema from '@/schemas/login-schema';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { email, password } = validatedFields.data;

	const user = await db.user.findUnique({
		where: {
			email,
		},
	});

	if (!user) {
		return { error: en.INVALID_CREDENTIALS };
	}

	if (!user.emailVerified) {
		return { error: en.auth.CONFIRM_EMAIL_FIRST };
	}

	// todo - handle 2FA

	try {
		await signIn('credentials', {
			email,
			password,
			redirect: false,
		});
	} catch (error) {
		if (error instanceof AuthError && error.type === 'CredentialsSignin') {
			return { error: en.INVALID_CREDENTIALS };
		}
		return { error: en.SOMETHING_WENT_WRONG };
	}

	redirect(DEFAULT_LOGIN_REDIRECT);
};

export default login;
