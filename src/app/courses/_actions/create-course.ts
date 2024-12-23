'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { redirect } from 'next/navigation';

const createCourse = async (_prevState: any, formData: FormData) => {
	const name = formData.get('name')?.toString();
	const teacher = formData.get('teacher')?.toString();
	const color = formData.get('color')?.toString();

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

		await db.course.create({
			data: {
				userId: user.id,
				name,
				teacher,
				color,
			},
		});
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}

	redirect('/courses');
};

export default createCourse;
