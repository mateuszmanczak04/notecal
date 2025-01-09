'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';

export type T_DeleteNoteInput = { id: string };

export type T_DeleteNoteResult = Promise<{ error: string } | { success: true }>;

const deleteNote = async ({ id }: T_DeleteNoteInput): T_DeleteNoteResult => {
	if (!id) {
		return { error: 'ID is required' };
	}

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const note = await db.note.findUnique({ where: { id } });

		const courseNotes = await db.note.findMany({
			where: {
				courseId: note?.courseId,
			},
		});

		// Prevent users from deleting the only course's note
		if (courseNotes.length === 1) {
			return { error: 'Every course must have at least one note' };
		}

		await db.note.delete({
			where: { id, userId: user.id },
		});

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default deleteNote;
