'use server';

import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const deleteCourse = async (_currentState: unknown, fd: FormData) => {
	const id = fd.get('id')?.toString();

	if (!id) {
		throw new Error('Course id is required.');
	}

	try {
		// todo - check if user is authorized

		await db.course.delete({ where: { id } });
	} catch (error: any) {
		throw new Error('Something went wrong.');
	}

	redirect('/courses');
};

export default deleteCourse;
