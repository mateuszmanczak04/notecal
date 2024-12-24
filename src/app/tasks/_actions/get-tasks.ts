'use server';

import db from '@/utils/db';
import { getUser } from '@/utils/get-user';
import { cache } from 'react';

export type T_GetTasksInput = {
	orderBy?: string;
};

const getTasks = cache(async ({ orderBy }: T_GetTasksInput) => {
	const user = await getUser();

	if (!user) return [];

	const tasks = await db.task.findMany({
		where: { userId: user.id },
		orderBy: {
			[orderBy || user.orderTasks]: 'asc',
		},
	});

	return tasks;
});

export default getTasks;
