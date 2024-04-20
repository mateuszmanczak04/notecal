'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { UpdateTaskDescriptionSchema } from '@/schemas';
import { z } from 'zod';

export const updateTaskDescription = async (
	values: z.infer<typeof UpdateTaskDescriptionSchema>,
) => {
	const validatedFields = UpdateTaskDescriptionSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { newDescription, id } = validatedFields.data;

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
				description: newDescription || '',
			},
		});

		return { updated: true };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};
