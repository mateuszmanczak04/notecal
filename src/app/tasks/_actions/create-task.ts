'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { revalidatePath } from 'next/cache';

const createTask = async (_prevState: any, formData: FormData) => {
	const title = formData.get('title')?.toString();

	if (!title) {
		return { error: 'Task title is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return {
				error: en.auth.UNAUTHENTICATED,
			};
		}

		const task = await db.task.create({
			data: {
				userId: user.id,
				title,
			},
		});

		revalidatePath('/tasks');

		return { task };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default createTask;
