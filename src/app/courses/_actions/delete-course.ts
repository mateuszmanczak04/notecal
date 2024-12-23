'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { redirect } from 'next/navigation';

type T_Input = {
	id: string;
};

type T_Result = Promise<{ error: string } | undefined>;

const deleteCourse = async ({ id }: T_Input): T_Result => {
	if (!id) {
		return { error: 'ID is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();
		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}
		await db.course.delete({ where: { id, userId: user.id } });
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}

	redirect('/courses');
};

export default deleteCourse;
