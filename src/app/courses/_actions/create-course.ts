'use server';

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
		// const session = await auth();
		return { newCourse: null };

		// if (!session?.user?.id) {
		// 	return { error: en.auth.UNAUTHENTICATED };
		// }

		// const newCourse = await db.course.create({
		// 	data: {
		// 		userId: session.user.id,
		// 		name,
		// 		teacher,
		// 		color,
		// 	},
		// });

		// return { newCourse };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default createCourse;
