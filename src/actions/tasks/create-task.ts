'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import CreateTaskSchema from '@/schemas/create-task-schema';
import { z } from 'zod';

const createTask = async (values: z.infer<typeof CreateTaskSchema>) => {
	const validatedFields = CreateTaskSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { courseId, title, completed, description, dueDate, priority } =
		validatedFields.data;

	if (!title) {
		return { error: 'Task title is required.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return {
				error:
					'Only users who logged in can create tasks. Try to logout and login again if you have it done.',
			};
		}

		// if user specifies the course, we have to check if that course exists
		// if not, it doesn't matter because courseId is going to be null in the database
		if (courseId) {
			const course = await db.course.findUnique({
				where: { id: courseId, userId: session.user.id },
			});

			if (course && course?.userId != session.user.id) {
				return { error: 'Course not found.' };
			}
		}

		const task = await db.task.create({
			data: {
				userId: session.user.id,
				courseId: courseId || null,
				title,
				completed,
				description,
				dueDate,
				priority: priority || null,
			},
		});

		return { task };
	} catch (error) {
		console.log(error);
		return { error: 'Something went wrong. Please try again.' };
	}
};

export default createTask;
