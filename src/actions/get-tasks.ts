'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { GetTasksSchema } from '@/schemas';
import { z } from 'zod';

export const getTasks = async (values: z.infer<typeof GetTasksSchema>) => {
	const validatedFields = GetTasksSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const orderBy = validatedFields.data.orderBy;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		const orderByObject: { [key: string]: string } = {};

		switch (orderBy) {
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
				orderByObject.priority = 'desc';
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
