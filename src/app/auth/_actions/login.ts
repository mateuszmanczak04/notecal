'use server';

import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import LoginSchema from '@/schemas/login-schema';
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

	// TODO: login

	redirect(DEFAULT_LOGIN_REDIRECT);
};

export default login;
