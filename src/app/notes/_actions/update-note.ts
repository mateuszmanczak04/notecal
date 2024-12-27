'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Note } from '@prisma/client';
import { fromZonedTime } from 'date-fns-tz';

export type T_UpdateNoteInput = {
	id: string;
	startTime?: Date;
	endTime?: Date;
	content?: string;
	courseId?: string;
};

export type T_UpdateNoteResult = Promise<{ error: string } | { note: Note }>;

const updateNote = async ({ id, startTime, endTime, content, courseId }: T_UpdateNoteInput): T_UpdateNoteResult => {
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
				startTime: startTime && fromZonedTime(startTime, 'Europe/Warsaw'),
				endTime: endTime && fromZonedTime(endTime, 'Europe/Warsaw'),
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
