'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Note } from '@prisma/client';

export type T_UpdateNoteInput = {
	id: string;
	startTime?: Date | null;
	endTime?: Date | null;
	title?: string;
	content?: string;
	courseId?: string;
};

export type T_UpdateNoteResult = Promise<{ error: string } | { note: Note }>;

const updateNote = async ({
	id,
	startTime,
	endTime,
	title,
	content,
	courseId,
}: T_UpdateNoteInput): T_UpdateNoteResult => {
	if (!id) {
		return { error: 'ID is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const note = await db.note.findUnique({
			where: { id },
		});

		if (!note) {
			return { error: 'Note not found' };
		}

		// Do these checks only if user requested change of note's course
		if (courseId) {
			const notesCourse = await db.course.findUnique({ where: { id: note.courseId } });

			// Don't allow users to leave a course without any note
			if (notesCourse) {
				const courseNotes = await db.note.findMany({ where: { courseId: notesCourse?.id } });
				if (!courseNotes || courseNotes.length === 1) {
					return {
						error: 'You cannot leave this course without any note, please create a new one before moving this',
					};
				}
			} else {
				// Should never occur as every note should have corresponding course
				return { error: 'Course not found' };
			}
		}

		const updatedNote = await db.note.update({
			where: { id, userId: user.id },
			data: {
				title,
				startTime,
				endTime,
				content,
				courseId,
			},
		});

		return { note: updatedNote };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateNote;
