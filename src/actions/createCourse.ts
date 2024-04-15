'use server';

import Course from '@/models/Course';
import { CreateCourseFormSchema } from '@/schemas';
import dbConnect from '@/utils/dbConnect';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createCourse = async (values: z.infer<typeof CreateCourseFormSchema>) => {
	const validatedFields = CreateCourseFormSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { name, teacher } = validatedFields.data;

	if (!name) {
		return { error: 'Course name is required.' };
	}

	if (!teacher) {
		return { error: 'Course teacher is required.' };
	}

	try {
		await dbConnect();

		await Course.create({
			name,
			teacher,
		});
	} catch (error: any) {
		return { error: 'Something went wrong' };
	}

	redirect('/courses');
};

export default createCourse;
