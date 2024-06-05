'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { z } from 'zod';

const GetCourseSchema = z.object({
	courseId: z.string(),
});

const getCourse = async (values: z.infer<typeof GetCourseSchema>) => {
	const validatedFields = GetCourseSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		const course = await db.course.findUnique({
			where: { userId: session.user.id, id: validatedFields.data.courseId },
		});

		if (!course) {
			return { error: 'Course not found.' };
		}

		return { course };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};

export default getCourse;
