'use server';

import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { LoginSchema } from '@/schemas';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const login = async (values: z.infer<typeof LoginSchema>) => {
	const validatedFields = LoginSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { email, password } = validatedFields.data;

	// todo - send verification email

	// todo - handle 2FA

	try {
		await signIn('credentials', {
			email,
			password,
			redirect: false,
		});
	} catch (error: any) {
		if (error instanceof AuthError && error.type === 'CredentialsSignin') {
			return { error: 'Invalid credentials.' };
		}
		return { error: 'Something went wrong.' };
	}

	redirect(DEFAULT_LOGIN_REDIRECT);
};

export default login;
