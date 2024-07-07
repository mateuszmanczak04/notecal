'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { z } from 'zod';

const DeleteTaskSchema = z.object({
	id: z.string().min(1, { message: en.tasks.ID_REQUIRED }),
});

const deleteTask = async (values: z.infer<typeof DeleteTaskSchema>) => {
	const validatedFields = DeleteTaskSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const id = validatedFields.data.id;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const task = await db.task.findUnique({
			where: { id, userId: session.user.id },
		});

		if (!task) {
			return { error: en.tasks.NOT_FOUND };
		}

		await db.task.delete({ where: { id } });

		return { deleted: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default deleteTask;
