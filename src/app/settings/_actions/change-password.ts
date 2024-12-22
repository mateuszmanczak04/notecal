'use server';

import { getAuthStatus } from '@/lib/auth';
import { comparePasswords, hashPassword } from '@/lib/bcrypt';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';

const changePassword = async (_prevState: any, formData: FormData): Promise<{ message?: string; error?: string }> => {
	const oldPassword = formData.get('oldPassword')?.toString(); // New email
	const newPassword = formData.get('newPassword')?.toString(); // Current password

	if (!oldPassword || !newPassword) {
		return { error: en.INVALID_DATA };
	}
	try {
		const { authenticated, user: authUser } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const user = await db.user.findUnique({
			where: { id: authUser.id },
			select: { password: true },
		});

		// It should not occur in normal conditions
		if (!user || !user.password) {
			return { error: en.auth.USER_DOES_NOT_EXIST };
		}

		// Check if the old password is correct
		const passwordsMatch = await comparePasswords(oldPassword, user.password);
		if (!passwordsMatch) {
			return { error: en.auth.WRONG_PASSWORD };
		}

		const hashedPassword = await hashPassword(newPassword);

		await db.user.update({
			where: { id: authUser.id },
			data: { password: hashedPassword },
		});

		return { message: en.auth.PASSWORD_UPDATED };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default changePassword;
