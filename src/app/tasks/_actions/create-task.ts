'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import CreateTaskSchema from '@/schemas/create-task-schema';
import { z } from 'zod';

const createTask = async (values: z.infer<typeof CreateTaskSchema>) => {
	const validatedFields = CreateTaskSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { courseId, title, completed, description, dueDate, priority } =
		validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return {
				error: en.auth.UNAUTHENTICATED,
			};
		}

		// if user specifies the course, we have to check if that course exists
		// if not, it doesn't matter because courseId is going to be null in the database
		if (courseId) {
			const course = await db.course.findUnique({
				where: { id: courseId, userId: session.user.id },
			});

			if (course && course?.userId != session.user.id) {
				return { error: en.courses.NOT_FOUND };
			}
		}

		const newTask = await db.task.create({
			data: {
				userId: session.user.id,
				courseId: courseId || null,
				title,
				completed,
				description,
				dueDate,
				priority,
			},
		});

		return { newTask };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default createTask;
