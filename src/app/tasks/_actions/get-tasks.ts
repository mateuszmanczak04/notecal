'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';

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

		const orderByObject: { [key: string]: string } = {};

		switch (userSettings?.orderTasks || 'createdAt') {
			case 'title':
				orderByObject.title = 'asc';
				break;
			case 'createdAt':
				orderByObject.createdAt = 'desc';
				break;
			case 'dueDate':
				orderByObject.dueDate = 'asc';
				break;
			case 'priority':
				orderByObject.priority = 'asc';
				break;
			case 'completed':
				orderByObject.completed = 'desc';
				break;
			default:
				orderByObject.createdAt = 'desc';
				break;
		}

		const tasks = await db.task.findMany({
			where: { userId: session.user.id },
			orderBy: orderByObject,
		});

		return { tasks };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default getTasks;
