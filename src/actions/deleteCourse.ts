'use server';

import Course from '@/models/Course';
import dbConnect from '@/utils/dbConnect';
import { redirect } from 'next/navigation';

const deleteCourse = async (_currentState: unknown, fd: FormData) => {
	const id = fd.get('id');

	if (!id) {
		throw new Error('Course id is required');
	}

	try {
		await dbConnect();
		await Course.findByIdAndDelete(id);
	} catch (error: any) {
		throw new Error('Something went wrong');
	}

	redirect('/courses');
};

export default deleteCourse;
