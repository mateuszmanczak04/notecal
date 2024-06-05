'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { GetTasksSchema } from '@/schemas';
import { z } from 'zod';

const getTasks = async (values: z.infer<typeof GetTasksSchema>) => {
	const validatedFields = GetTasksSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
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
		return { error: 'Something went wrong.' };
	}
};

export default getTasks;
