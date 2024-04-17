'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { CreateCourseFormSchema } from '@/schemas';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const createCourse = async (values: z.infer<typeof CreateCourseFormSchema>) => {
	const validatedFields = CreateCourseFormSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { name, teacher } = validatedFields.data;

	if (!name) {
		return { error: 'Course name is required.' };
	}

	if (!teacher) {
		return { error: 'Course teacher is required.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthenticated.' };
		}

		await db.course.create({
			data: {
				userId: session.user.id,
				name,
				teacher,
			},
		});
	} catch (error: any) {
		return { error: 'Something went wrong' };
	}

	redirect('/courses');
};

export default createCourse;
