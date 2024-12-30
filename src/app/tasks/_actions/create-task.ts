'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Task } from '@prisma/client';

export type T_CreateTaskInput = {
	title: string;
	courseId?: string;
};

export type T_CreateTaskResult = Promise<{ error: string } | { task: Task }>;

const createTask = async ({ title, courseId }: T_CreateTaskInput): T_CreateTaskResult => {
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
				courseId,
			},
		});

		return { task };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default createTask;
