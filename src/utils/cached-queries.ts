import { cache } from 'react';
import { getAuthStatus } from './auth';
import db from './db';

export const getUser = cache(async () => {
	const { authenticated, user: authUser } = await getAuthStatus();

	if (!authenticated) return null;

	const user = await db.user.findUnique({ where: { id: authUser.id } });

	return user;
});

export const getTasks = cache(async () => {
	const user = await getUser();

	if (!user) return null;

	const tasks = await db.task.findMany({
		where: { userId: user.id },
		orderBy: {
			[user.orderTasks]: 'asc',
		},
	});

	return tasks;
});
