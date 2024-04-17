'use server';

import { db } from '@/lib/db';
import { EditCourseFormSchema } from '@/schemas';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const editCourse = async (values: z.infer<typeof EditCourseFormSchema>) => {
	const validatedFields = EditCourseFormSchema.safeParse(values);

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
		// todo - check if user is authorized

		await db.course.update({
			where: { id },
			data: { name: newName, teacher: newTeacher },
		});
	} catch (error: any) {
		return { error: 'Something went wrong.' };
	}

	redirect('/courses');
};

export default editCourse;
