'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { CreateTaskFormSchema } from '@/schemas';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createTask = async (values: z.infer<typeof CreateTaskFormSchema>) => {
	const validatedFields = CreateTaskFormSchema.safeParse(values);

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

		const course = await db.course.findUnique({
			where: { id: courseId, userId: session.user.id },
		});

		if (!course) {
			return { error: 'Course not found.' };
		}

		await db.task.create({
			data: {
				userId: session.user.id,
				courseId,
				title,
				completed,
				description,
				dueDate,
				priority,
			},
		});
	} catch (error) {
		return { error: 'Something went wrong. Please try again.' };
	}

	redirect('/tasks');
};

export default createTask;
