'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { UpdateTaskNameSchema } from '@/schemas';
import { z } from 'zod';

export const updateTaskName = async (
	values: z.infer<typeof UpdateTaskNameSchema>,
) => {
	const validatedFields = UpdateTaskNameSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { newTitle, id } = validatedFields.data;

	if (!newTitle || !id) {
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
				title: newTitle,
			},
		});

		return { updated: true };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};
