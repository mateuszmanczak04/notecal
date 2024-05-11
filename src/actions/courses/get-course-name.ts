'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { GetCourseNameSchema } from '@/schemas';
import { z } from 'zod';

export const getCourseName = async (
	values: z.infer<typeof GetCourseNameSchema>,
) => {
	const validatedFields = GetCourseNameSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		let course = await db.course.findUnique({
			where: { userId: session.user.id, id: validatedFields.data.courseId },
			select: { name: true },
		});

		if (!course) {
			return { error: 'Course does not exist.' };
		}

		return { courseName: course.name };
	} catch (error) {
		console.log(error);
		return { error: 'Something went wrong.' };
	}
};
