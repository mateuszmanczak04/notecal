'use server';

import Course from '@/models/Course';
import dbConnect from '@/utils/dbConnect';
import { revalidatePath } from 'next/cache';

const renameCourse = async (_currentState: unknown, fd: FormData) => {
	const id = fd.get('id');
	const name = fd.get('name');

	if (!id) {
		throw new Error('Course id is required');
	}

	if (!name) {
		throw new Error('New name is required');
	}

	try {
		await dbConnect();
		await Course.findByIdAndUpdate(id, { name });
	} catch (error: any) {
		return { status: 'error', message: 'Something went wrong' };
	}

	revalidatePath('/courses');
	revalidatePath('/courses/edit');
	return { status: 'ok', message: 'Course renamed successfully' };
};

export default renameCourse;
