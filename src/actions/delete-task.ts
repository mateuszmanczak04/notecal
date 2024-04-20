'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { DeleteTaskSchema } from '@/schemas';
import { z } from 'zod';

export const deleteTask = async (values: z.infer<typeof DeleteTaskSchema>) => {
	const validatedFields = DeleteTaskSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const id = validatedFields.data.id;

	if (!id) {
		return { error: 'Missing task id.' };
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

		await db.task.delete({ where: { id } });

		return { deleted: true };
	} catch (error) {
		return { error: 'Something went wrong. Please try again later.' };
	}
};
