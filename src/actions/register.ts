'use server';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/schemas';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import login from './login';

const register = async (values: z.infer<typeof RegisterSchema>) => {
	const validatedFields = RegisterSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { email, password, confirmPassword } = validatedFields.data;

	if (password !== confirmPassword) {
		return { error: 'Passwords do not match.' };
	}

	try {
		// Email taken:
		const existingUser = await db.user.findUnique({ where: { email } });
		if (existingUser) {
			return { error: 'Email already in use.' };
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		await db.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		// todo - verification token
	} catch (error: any) {
		return { error: 'Something went wrong.' };
	}

	await login({ email, password });
};

export default register;
