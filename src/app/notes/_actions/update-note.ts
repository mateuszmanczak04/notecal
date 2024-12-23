'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Note } from '@prisma/client';

type T_Input = {
	id: string;
	startTime?: Date;
	endTime?: Date;
	content?: string;
	courseId?: string;
};

type T_Result = Promise<{ error: string } | { note: Note }>;

const updateNote = async ({ id, startTime, endTime, content, courseId }: T_Input): T_Result => {
	if (!id) {
		return { error: 'ID is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const note = await db.note.update({
			where: { id, userId: user.id },
			data: {
				startTime,
				endTime,
				content,
				courseId,
			},
		});

		return { note };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateNote;
