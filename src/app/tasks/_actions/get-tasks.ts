'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { getSortedTasks } from '@/lib/utils';

const getTasks = async () => {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const userSettings = await db.settings.findUnique({
			where: { userId: session.user.id },
		});

		if (!userSettings) {
			await db.settings.create({
				data: {
					userId: session.user.id,
					language: 'en',
					orderTasks: 'createdAt',
				},
			});
		}

		const tasks = await db.task.findMany({
			where: { userId: session.user.id },
		});

		return {
			tasks: getSortedTasks(
				tasks,
				userSettings?.orderTasks || 'createdAt',
			),
		};
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default getTasks;
