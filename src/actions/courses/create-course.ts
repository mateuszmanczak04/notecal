'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import CreateCourseSchema from '@/schemas/create-course-schema';
import { z } from 'zod';

const createCourse = async (values: z.infer<typeof CreateCourseSchema>) => {
	const validatedFields = CreateCourseSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { name, teacher } = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.UNAUTHENTICATED };
		}

		const course = await db.course.create({
			data: {
				userId: session.user.id,
				name,
				teacher,
			},
		});

		return { course };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default createCourse;
