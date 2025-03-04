'use server';

import db from '@/utils/db';
import getUser from '@/utils/get-user';
import { cache } from 'react';

const getTasks = cache(async () => {
	try {
		const user = await getUser();

		const tasks = await db.task.findMany({
			where: { userId: user.id },
			orderBy: { weight: 'desc' },
		});

		return tasks;
	} catch {
		return [];
	}
});

export default getTasks;
