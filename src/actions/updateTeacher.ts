'use server';

import Course from '@/models/Course';
import dbConnect from '@/utils/dbConnect';
import { revalidatePath } from 'next/cache';

const updateTeacher = async (_currentState: unknown, fd: FormData) => {
	const id = fd.get('id');
	const teacher = fd.get('teacher');

	if (!id) {
		throw new Error('Course id is required');
	}

	try {
		await dbConnect();
		await Course.findByIdAndUpdate(id, { teacher });
	} catch (error: any) {
		return { status: 'error', message: 'Something went wrong' };
	}

	revalidatePath('/courses');
	revalidatePath('/courses/edit');
	return { status: 'ok', message: 'Teacher updated successfully' };
};

export default updateTeacher;
