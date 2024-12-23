'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Note } from '@prisma/client';
import { addMinutes } from 'date-fns';

export type T_CreateNoteInput = {
	courseId: string;
};

export type T_CreateNoteResult = Promise<{ error: string } | { note: Note }>;

/**
 * Creates a new note in the database related to passed courseId.
 */
const createNote = async ({ courseId }: T_CreateNoteInput): T_CreateNoteResult => {
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
			select: {
				defaultNoteDuration: true,
			},
		});

		// It should not occur in normal conditions
		if (!user) {
			return { error: 'User does not exist' };
		}

		const startTime = new Date();
		startTime.setSeconds(0, 0); // Set seconds and milliseconds to 0
		const endTime = addMinutes(startTime, user.defaultNoteDuration);

		const note = await db.note.create({
			data: {
				courseId,
				startTime: startTime,
				endTime: endTime,
				userId: authUser.id,
			},
		});

		return { note };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default createNote;
