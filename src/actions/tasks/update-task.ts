'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { TaskPriority } from '@prisma/client';
import { z } from 'zod';

const UpdateTaskSchema = z.object({
	id: z.string(),
	courseId: z.string().optional().nullable(),
	completed: z.boolean().optional(),
	title: z.string().optional(),
	description: z.string().optional(),
	dueDate: z.coerce.date().optional().nullable(),
	priority: z
		.enum([TaskPriority.A, TaskPriority.B, TaskPriority.C])
		.optional()
		.nullable(),
});

const updateTask = async (values: z.infer<typeof UpdateTaskSchema>) => {
	const validatedFields = UpdateTaskSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const data = validatedFields.data;

	if (!data.id) {
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

		await db.task.update({
			where: { id: data.id, userId: session.user.id },
			data,
		});

		return { success: true };
	} catch (error) {
		return { error: 'Something went wrong. Please try again.' };
	}
};

export default updateTask;
