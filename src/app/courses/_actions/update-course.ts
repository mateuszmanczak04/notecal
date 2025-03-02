'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Course } from '@prisma/client';

export type T_UpdateCourseInput = {
	id: string;
	name?: string;
	teacher?: string;
	color?: string;
	usefulLinks?: string;
};

export type T_UpdateCourseResult = Promise<{ error: string } | { course: Course }>;

const updateCourse = async ({ id, name, teacher, color, usefulLinks }: T_UpdateCourseInput): T_UpdateCourseResult => {
	if (!id) {
		return { error: 'ID is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		if (name && name.trim().length === 0) {
			return { error: 'Course name cannot be empty' };
		}

		const course = await db.course.update({
			where: { id, userId: user.id },
			data: {
				name,
				teacher,
				color,
				usefulLinks,
			},
		});

		return { course };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateCourse;
