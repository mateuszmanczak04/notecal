'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Course } from '@prisma/client';

type T_Input = {
	id: string;
	name?: string;
	teacher?: string;
	color?: string;
};

type T_Result = Promise<{ error: string } | { course: Course }>;

const updateCourse = async ({ id, name, teacher, color }: T_Input): T_Result => {
	if (!id) {
		return { error: 'ID is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const course = await db.course.update({
			where: { id, userId: user.id },
			data: {
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

export default updateCourse;
