'use server';

import { getAuthStatus } from '@/utils/auth';
import { generatePutPresignedUrl } from '@/utils/aws';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { getDefaultNewNoteContent } from '@/utils/get-default-new-note-content';
import { Note } from '@prisma/client';
import { addMinutes } from 'date-fns';

export type T_CreateNoteInput = {
	courseId: string;
	startTime?: Date;
	duration?: number;
};

export type T_CreateNoteResult = Promise<{ error: string } | { note: Note }>;

/**
 * Creates a new note in the database related to passed courseId.
 */
const createNote = async ({ courseId, startTime, duration }: T_CreateNoteInput): T_CreateNoteResult => {
	if (!courseId) {
		return { error: 'Course ID is required' };
	}

	try {
		const { authenticated, user: authUser } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		// Fetch user's settings to know default note duration
		const user = await db.user.findUnique({
			where: { id: authUser.id },
		});

		// It should not occur in normal conditions
		if (!user) {
			return { error: 'User does not exist' };
		}

		const actualStartTime = startTime || null;
		let endTime: Date | null = null;
		if (actualStartTime) {
			actualStartTime.setSeconds(0, 0); // Set seconds and milliseconds to 0
			endTime = addMinutes(actualStartTime, duration || 60);
		}

		const note = await db.note.create({
			data: {
				courseId,
				startTime: actualStartTime,
				endTime: endTime,
				userId: authUser.id,
			},
		});

		const uploadLink = await generatePutPresignedUrl(note.id);

		const res = await fetch(uploadLink, {
			method: 'PUT',
			body: getDefaultNewNoteContent(),
		});

		return { note };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default createNote;
