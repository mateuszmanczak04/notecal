'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Task } from '@prisma/client';

export type T_UpdateTaskInput = {
	id: string;
	courseId?: string | null;
	completed?: boolean;
	title?: string;
	description?: string;
	dueDate?: Date | null;
	priority?: 'A' | 'B' | 'C';
	weight?: number;
};

export type T_UpdateTaskResult = Promise<{ error: string } | { task: Task | null }>;

const updateTask = async (data: T_UpdateTaskInput): T_UpdateTaskResult => {
	if (!data.id) {
		return { error: 'Task id is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return {
				error: en.auth.UNAUTHENTICATED,
			};
		}

		let task: Task | null = null;
		// Delete task if it's title's length becomes equal zero
		if (data.title?.trim() === '') {
			await db.task.delete({
				where: { id: data.id, userId: user.id },
			});
		} else {
			task = await db.task.update({
				where: { id: data.id, userId: user.id },
				data,
			});
		}

		return { task };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateTask;
