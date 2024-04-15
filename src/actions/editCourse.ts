'use server';

import Course from '@/models/Course';
import { EditCourseFormSchema } from '@/schemas';
import dbConnect from '@/utils/dbConnect';
import mongoose from 'mongoose';
import { revalidatePath } from 'next/cache';
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
		await dbConnect();

		await Course.findOneAndUpdate(
			{
				_id: id,
			},
			{ name: newName, teacher: newTeacher },
			{ new: true },
		).then(res => console.log('res', res));
	} catch (error: any) {
		console.log(error);
		return { error: 'Something went wrong.' };
	}

	redirect('/courses');
};

export default editCourse;
