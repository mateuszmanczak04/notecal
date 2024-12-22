'use server';

import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';

type Schema = {
	id: string;
	courseId?: string;
	completed?: boolean;
	title?: string;
	description?: string;
	dueDate?: Date;
	priority?: 'A' | 'B' | 'C';
};

const updateTask = async (data: Schema) => {
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

		const updatedTask = await db.task.update({
			where: { id: data.id, userId: user.id },
			data,
		});

		return { updatedTask };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateTask;
