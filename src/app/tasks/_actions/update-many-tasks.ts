'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Task as T_Task } from '@prisma/client';

export type T_UpdateManyTasksInput = {
	tasks: T_Task[];
};

export type T_UpdateManyTasksResult = Promise<{ error: string } | { tasks: T_Task[] }>;

const updateManyTasks = async (data: T_UpdateManyTasksInput): T_UpdateManyTasksResult => {
	if (!data.tasks) {
		return { error: 'Tasks are required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return {
				error: en.auth.UNAUTHENTICATED,
			};
		}

		console.table(
			data.tasks
				.map(task => ({ title: task.title, weight: task.weight }))
				.toSorted((a, b) => b.weight - a.weight),
		);

		const tasks = await Promise.all(
			(data.tasks || []).map(async task => {
				if (task.title.trim() === '') {
					return db.task.delete({ where: { id: task.id } });
				}
				return db.task.update({ where: { id: task.id, userId: user.id }, data: task });
			}),
		);

		console.table(
			tasks.map(task => ({ title: task.title, weight: task.weight })).toSorted((a, b) => b.weight - a.weight),
		);

		return { tasks };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateManyTasks;
