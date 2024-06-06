'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import ChangePasswordSchema from '@/schemas/change-password-schema';

const changePassword = async (values: z.infer<typeof ChangePasswordSchema>) => {
	const validatedFields = ChangePasswordSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid data' };
	}

	const { oldPassword, newPassword } = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthenticated' };
		}

		const user = await db.user.findUnique({
			where: { id: session.user.id },
			select: { password: true },
		});

		if (!user || !user.password) {
			return { error: 'User does not exist.' };
		}

		const passwordsMatch = await bcrypt.compare(oldPassword, user.password);

		if (!passwordsMatch) {
			return { error: 'Wrong old password.' };
		}

		const hashedPassword = await bcrypt.hash(newPassword, 10);

		await db.user.update({
			where: { id: session.user.id },
			data: { password: hashedPassword },
		});

		return { message: 'Password updated successfully.' };
	} catch (error) {
		return { error: 'Something went wrong. Please try again.' };
	}
};

export default changePassword;
