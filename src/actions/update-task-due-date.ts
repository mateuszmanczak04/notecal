'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { UpdateTaskDueDateSchema } from '@/schemas';
import { z } from 'zod';

export const updateTaskDueDate = async (
	values: z.infer<typeof UpdateTaskDueDateSchema>,
) => {
	const validatedFields = UpdateTaskDueDateSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { newDueDate: newDueDateString, id } = validatedFields.data;

	const newDueDate = new Date(newDueDateString);

	if (!id) {
		return { error: 'Missing fields.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthenticated.' };
		}

		const task = await db.task.findUnique({
			where: { id, userId: session.user.id },
		});

		if (!task) {
			return { error: 'Task not found.' };
		}

		await db.task.update({
			where: { id },
			data: {
				dueDate: newDueDate,
			},
		});

		return { updated: true };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};
