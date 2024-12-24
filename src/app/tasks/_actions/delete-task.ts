'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { revalidatePath } from 'next/cache';

export type T_DeleteTaskInput = {
	id: string;
};

export type T_DeleteTaskResult = Promise<{ error: string } | { success: true }>;

const deleteTask = async ({ id }: T_DeleteTaskInput): T_DeleteTaskResult => {
	if (!id) {
		return { error: 'Task id is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		// We don't check if tasks exists and just fake it has been deleted. Thanks to that we don't give any information to mallicious users.

		await db.task.delete({ where: { id, userId: user.id } });

		revalidatePath('/tasks');

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default deleteTask;
