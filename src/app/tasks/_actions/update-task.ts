'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { TaskPriority } from '@prisma/client';
import { z } from 'zod';

const UpdateTaskSchema = z.object({
	id: z.string().min(1, { message: en.tasks.ID_REQUIRED }),
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
		return { error: en.INVALID_DATA };
	}

	const data = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return {
				error: en.UNAUTHENTICATED,
			};
		}

		await db.task.update({
			where: { id: data.id, userId: session.user.id },
			data,
		});

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateTask;
