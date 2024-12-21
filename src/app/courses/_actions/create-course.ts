'use server';

import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import CreateCourseSchema from '@/schemas/create-course-schema';
import { z } from 'zod';

const createCourse = async (values: z.infer<typeof CreateCourseSchema>) => {
	const validatedFields = CreateCourseSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { name, teacher, color } = validatedFields.data;

	const colorRegex = /^#[0-9A-F]{6}$/i;
	const isValidColor = colorRegex.test(color);

	if (!isValidColor) {
		return { error: en.courses.INVALID_COLOR };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const newCourse = await db.course.create({
			data: {
				userId: user.id,
				name,
				teacher,
				color,
			},
		});

		return { newCourse };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default createCourse;
