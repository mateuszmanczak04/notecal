'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import UpdateCourseSchema from '@/schemas/update-course-schema';
import { z } from 'zod';

const updateCourse = async (values: z.infer<typeof UpdateCourseSchema>) => {
	const validatedFields = UpdateCourseSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { id, newName, newTeacher } = validatedFields.data;

	if (!id) {
		return { error: 'Course id is required.' };
	}

	if (!newName) {
		return { error: 'Course name is required.' };
	}

	if (!newTeacher) {
		return { error: 'Course teacher is required.' };
	}

	try {
		const session = await auth();

		await db.course.update({
			where: { id, userId: session?.user?.id },
			data: { name: newName, teacher: newTeacher },
		});

		return { success: true };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};

export default updateCourse;
