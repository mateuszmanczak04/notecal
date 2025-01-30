'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Note } from '@prisma/client';

export type T_DuplicateNoteInput = {
	id: string;
};

export type T_DuplicateNoteResult = Promise<{ error: string } | { note: Note }>;

export const duplicateNote = async (data: T_DuplicateNoteInput): T_DuplicateNoteResult => {
	if (!data.id) {
		return { error: 'ID is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const note = await db.note.findUnique({
			where: { id: data.id },
		});

		if (!note) {
			return { error: 'Note not found' };
		}

		const newNote = await db.note.create({
			data: {
				title: note.title + '(copy)',
				startTime: note.startTime,
				endTime: note.endTime,
				content: note.content,
				courseId: note.courseId,
				userId: user.id,
			},
		});

		return { note: newNote };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};
