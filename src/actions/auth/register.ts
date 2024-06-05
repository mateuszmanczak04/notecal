'use server';

import login from '@/actions/auth/login';
import db from '@/lib/db';
import RegisterSchema from '@/schemas/register-schema';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

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

		const user = await db.user.create({
			data: {
				email,
				password: hashedPassword,
			},
		});

		await db.settings.create({
			data: {
				userId: user.id,
				language: 'en',
			},
		});

		// todo - verification token
	} catch (error) {
		return { error: 'Something went wrong.' };
	}

	await login({ email, password });
};

export default register;
