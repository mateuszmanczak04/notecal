'use server';

import Course from '@/models/Course';
import { auth } from '@/utils/auth';
import dbConnect from '@/utils/dbConnect';
import { redirect } from 'next/navigation';

const createCourse = async (_currentState: unknown, fd: FormData) => {
	const courseName = fd.get('courseName');
	const courseTeacher = fd.get('courseTeacher');

	if (!courseName) {
		throw new Error('Course name is required');
	}

	try {
		await dbConnect();

		const course = await Course.create({
			name: courseName,
			teacher: courseTeacher,
		});

		// todo: remove this after implementing the real-time feature
		await new Promise(resolve => {
			setTimeout(resolve, 2000);
		});
	} catch (error: any) {
		throw new Error('Something went wrong');
	}

	redirect('/courses');
};

export default createCourse;
