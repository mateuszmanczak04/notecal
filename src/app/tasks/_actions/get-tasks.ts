'use server';

import db from '@/utils/db';
import { getUser } from '@/utils/get-user';
import { cache } from 'react';

const getTasks = cache(async () => {
	const user = await getUser();

	if (!user) return [];

	const orderBy = user.orderTasks;

	const tasks = await db.task.findMany({
		where: { userId: user.id },
		orderBy: {
			[orderBy || user.orderTasks]: 'asc',
		},
	});

	return tasks;
});

export default getTasks;
