'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { UpdateTaskCompletedSchema } from '@/schemas';
import { z } from 'zod';

const updateTaskCompleted = async (
	values: z.infer<typeof UpdateTaskCompletedSchema>,
) => {
	const validatedFields = UpdateTaskCompletedSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { id, newValue } = validatedFields.data;

	if (!id || newValue === null || newValue === undefined) {
		return { error: 'Missing fields.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return {
				error:
					'Only users who logged in can toggle tasks. Try to logout and login again if you have it done.',
			};
		}

		const task = await db.task.findUnique({
			where: { id, userId: session.user.id },
		});

		if (!task) {
			return { error: 'Task not found.' };
		}

		await db.task.update({
			where: {
				id,
			},
			data: {
				completed: newValue,
			},
		});

		return { completed: newValue };
	} catch (error) {
		return { error: 'Something went wrong. Please try again.' };
	}
};

export default updateTaskCompleted;
