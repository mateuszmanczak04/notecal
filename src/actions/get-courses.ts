'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export const getCourses = async () => {
	const session = await auth();

	if (!session?.user?.id) {
		return { error: 'Unauthorized.' };
	}

	try {
		const courses = await db.course.findMany({
			where: {
				userId: session?.user?.id,
			},
		});

		return { courses };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};
