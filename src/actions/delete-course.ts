'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { DeleteCourseSchema } from '@/schemas';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const deleteCourse = async (values: z.infer<typeof DeleteCourseSchema>) => {
	const validatedFields = DeleteCourseSchema.safeParse(values);

	if (!validatedFields.success) {
		throw new Error('Invalid fields.');
	}

	const id = validatedFields.data.id;

	if (!id) {
		throw new Error('Course id is required.');
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			throw new Error('Unauthorized.');
		}

		const course = await db.course.findUnique({
			where: { id, userId: session.user.id },
		});

		if (!course) {
			throw new Error('Course not found.');
		}

		await db.course.delete({ where: { id } });
	} catch (error) {
		throw new Error('Something went wrong.');
	}

	redirect('/courses');
};

export default deleteCourse;
