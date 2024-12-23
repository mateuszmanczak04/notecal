'use server';

import UpdateCourseSchema from '@/schemas/update-course-schema';
import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { z } from 'zod';

const updateCourse = async (values: z.infer<typeof UpdateCourseSchema>) => {
	const validatedFields = UpdateCourseSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const updatedCourse = await db.course.update({
			where: { id: validatedFields.data.id, userId: user.id },
			data: validatedFields.data,
		});

		return { updatedCourse };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateCourse;
