'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import ChangePasswordSchema from '@/schemas/change-password-schema';
import { en } from '@/lib/dictionary';

const changePassword = async (values: z.infer<typeof ChangePasswordSchema>) => {
	const validatedFields = ChangePasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { oldPassword, newPassword } = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.UNAUTHENTICATED };
		}

		const user = await db.user.findUnique({
			where: { id: session.user.id },
			select: { password: true },
		});

		if (!user || !user.password) {
			return { error: en.USER_DOES_NOT_EXIST };
		}

		const passwordsMatch = await bcrypt.compare(oldPassword, user.password);

		if (!passwordsMatch) {
			return { error: en.WRONG_PASSWORD };
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await db.user.update({
			where: { id: session.user.id },
			data: { password: hashedPassword },
		});

		return { message: en.PASSWORD_UPDATED };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default changePassword;
