'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { GetCourseTeacher } from '@/schemas';
import { z } from 'zod';

export const getCourseTeacher = async (
	values: z.infer<typeof GetCourseTeacher>,
) => {
	const validatedFields = GetCourseTeacher.safeParse(values);

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
			select: { teacher: true },
		});

		if (!course) {
			return { error: 'Course does not exist.' };
		}

		return { teacher: course.teacher };
	} catch (error) {
		console.log(error);
		return { error: 'Something went wrong.' };
	}
};
