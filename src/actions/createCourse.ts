'use server';

import Course from '@/models/Course';
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

		await Course.create({
			name: courseName,
			teacher: courseTeacher,
		});
	} catch (error: any) {
		throw new Error('Something went wrong');
	}

	redirect('/courses');
};

export default createCourse;
