'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { redirect } from 'next/navigation';

export type T_DeleteCourseInput = {
	id: string;
};

export type T_DeleteCourseResult = Promise<{ error: string } | { success: true }>;

const deleteCourse = async ({ id }: T_DeleteCourseInput): T_DeleteCourseResult => {
	if (!id) {
		return { error: 'ID is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();
		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}
		await db.course.delete({ where: { id, userId: user.id } });
		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}

	redirect('/courses');
};

export default deleteCourse;
