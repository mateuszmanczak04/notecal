'use server';

import { en } from '@/lib/dictionary';
import UpdateCourseSchema from '@/schemas/update-course-schema';
import { z } from 'zod';

const updateCourse = async (values: z.infer<typeof UpdateCourseSchema>) => {
	const validatedFields = UpdateCourseSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	try {
		// const session = await auth();

		// if (!session?.user?.id) {
		// 	return { error: en.auth.UNAUTHENTICATED };
		// }

		// const updatedCourse = await db.course.update({
		// 	where: { id: validatedFields.data.id, userId: session?.user?.id },
		// 	data: validatedFields.data,
		// });

		// return { updatedCourse };

		return { updatedCourse: null };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateCourse;
