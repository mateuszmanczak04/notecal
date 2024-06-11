'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import UpdateCourseSchema from '@/schemas/update-course-schema';
import { z } from 'zod';

const updateCourse = async (values: z.infer<typeof UpdateCourseSchema>) => {
	const validatedFields = UpdateCourseSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { id, newName, newTeacher } = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.UNAUTHENTICATED };
		}

		await db.course.update({
			where: { id, userId: session?.user?.id },
			data: { name: newName, teacher: newTeacher },
		});

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateCourse;
