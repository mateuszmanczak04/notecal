'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { cache } from 'react';

const getCourses = cache(async () => {
	const { authenticated, user } = await getAuthStatus();

	if (!authenticated) return [];

	try {
		const courses = await db.course.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				name: 'asc',
			},
		});

		return courses;
	} catch {
		return [];
	}
});

export default getCourses;
