'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Course } from '@prisma/client';

export type T_CreateCourseInput = {
	name: string;
	teacher: string;
	color: string;
};

export type T_CreateCourseResult = Promise<{ error: string } | { course: Course }>;

const createCourse = async ({ name, teacher, color }: T_CreateCourseInput) => {
	if (!name || !teacher || !color) {
		return { error: en.INVALID_DATA };
	}

	const colorRegex = /^#[0-9A-F]{6}$/i;
	const isValidColor = colorRegex.test(color);

	if (!isValidColor) {
		return { error: en.courses.INVALID_COLOR };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const course = await db.course.create({
			data: {
				userId: user.id,
				name,
				teacher,
				color,
			},
		});

		return { course };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default createCourse;
