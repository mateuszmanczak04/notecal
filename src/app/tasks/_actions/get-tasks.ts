'use server';

import getUser from '@/app/settings/_actions/get-user';
import db from '@/utils/db';
import { cache } from 'react';

const getTasks = cache(async () => {
	try {
		const user = await getUser();

		const tasks = await db.task.findMany({
			where: { userId: user.id },
			orderBy: {
				[user.orderTasks]: 'asc',
			},
		});

		return tasks;
	} catch {
		return [];
	}
});

export default getTasks;
