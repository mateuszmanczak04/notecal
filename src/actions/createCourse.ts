'use server';

import Course from '@/models/Course';
import dbConnect from '@/utils/dbConnect';
import { redirect } from 'next/navigation';

const createCourse = async (_currentState: unknown, fd: FormData) => {
	const name = fd.get('name');
	const teacher = fd.get('teacher');

	if (!name) {
		throw new Error('Course name is required');
	}

	try {
		await dbConnect();

		await Course.create({
			name,
			teacher,
		});
	} catch (error: any) {
		return { status: 'error', message: 'Something went wrong' };
	}

	redirect('/courses');
};

export default createCourse;
