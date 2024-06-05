'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { z } from 'zod';

const GetCourseTasksSchema = z.object({
	courseId: z.string(),
});

const getCourseTasks = async (values: z.infer<typeof GetCourseTasksSchema>) => {
	const validatedFields = GetCourseTasksSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		const tasks = await db.task.findMany({
			where: {
				userId: session.user.id,
				courseId: validatedFields.data.courseId,
			},
		});

		return { tasks };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};

export default getCourseTasks;
