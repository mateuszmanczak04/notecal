'use server';

import db from '@/utils/db';
import { getUser } from '@/utils/get-user';
import { cache } from 'react';

export const getTasks = cache(async () => {
	const user = await getUser();

	if (!user) return [];

	const tasks = await db.task.findMany({
		where: { userId: user.id },
		orderBy: {
			[user.orderTasks]: 'asc',
		},
	});

	return tasks;
});
