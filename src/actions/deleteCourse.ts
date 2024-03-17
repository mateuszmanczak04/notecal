'use server';

import Course from '@/models/Course';
import dbConnect from '@/utils/dbConnect';
import { revalidatePath } from 'next/cache';

const deleteCourse = async (courseId: string) => {
	if (!courseId) {
		throw new Error('Course id is required');
	}

	try {
		await dbConnect();
		await Course.findByIdAndDelete(courseId);
		revalidatePath('/courses');
	} catch (error: any) {
		throw new Error('Something went wrong');
	}
};

export default deleteCourse;
