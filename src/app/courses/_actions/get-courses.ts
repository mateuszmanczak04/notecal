'use server';

import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';

const getCourses = async () => {
	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const courses = await db.course.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				name: 'asc',
			},
		});

		return { courses };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default getCourses;
