'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { OTHER_COURSE_NAME } from '@/lib/utils';
import { UpdateTaskCourseIdSchema } from '@/schemas';
import { z } from 'zod';

export const updateTaskCourseId = async (
	values: z.infer<typeof UpdateTaskCourseIdSchema>,
) => {
	const validatedFields = UpdateTaskCourseIdSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { newCourseId, id } = validatedFields.data;

	if (!id || !newCourseId) {
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

		if (newCourseId !== OTHER_COURSE_NAME) {
			const course = await db.course.findUnique({
				where: {
					id: newCourseId,
					userId: session.user.id,
				},
			});

			if (!course) {
				return { error: 'Course not found.' };
			}
		}

		await db.task.update({
			where: { id },
			data: {
				courseId: newCourseId === OTHER_COURSE_NAME ? null : newCourseId,
			},
		});

		return { updated: true };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};
