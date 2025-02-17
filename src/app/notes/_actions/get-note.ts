'use server';

import { getAuthStatus } from '@/utils/auth';
import { generateGetPresignedUrl, generatePutPresignedUrl } from '@/utils/aws';
import db from '@/utils/db';
import { Note as T_Note } from '@prisma/client';

export type T_GetNoteInput = {
	id: string;
};

export type T_GetNoteOutput = Promise<
	| {
			note: T_Note;
			presignedUrlGet: string;
			presignedUrlPut: string;
	  }
	| {
			error: string;
	  }
>;

const getNote = async ({ id }: T_GetNoteInput): T_GetNoteOutput => {
	if (!id) return { error: 'Invalid note ID' };

	try {
		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) return { error: 'Unauthenticated' };

		const note = await db.note.findUnique({
			where: {
				id,
				userId: user.id,
			},
		});

		if (!note) return { error: 'Note not found' };

		const presignedUrlGet = await generateGetPresignedUrl(note.id);
		const presignedUrlPut = await generatePutPresignedUrl(note.id);

		return { note, presignedUrlGet, presignedUrlPut };
	} catch (error) {
		console.log(error);
		return { error: 'An error occurred' };
	}
};

export default getNote;
