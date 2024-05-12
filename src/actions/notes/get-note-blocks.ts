'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { NoteBlock } from '@prisma/client';
import { z } from 'zod';

const GetNoteBlocksSchema = z.object({
	noteId: z.string(),
});

export const getNoteBlocks = async (
	values: z.infer<typeof GetNoteBlocksSchema>,
) => {
	const validatedFields = GetNoteBlocksSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const noteId = validatedFields.data.noteId;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthenticated' };
		}

		const note = await db.note.findUnique({
			where: {
				id: noteId,
				userId: session.user.id,
			},
		});

		if (!note) {
			return { error: 'Note not found.' };
		}

		// const blocks = await db.noteBlock.findMany({
		// 	where: {
		// 		id: {
		// 			in: note.blockIds,
		// 		},
		// 	},
		// });

		const blocks = [] as NoteBlock[];

		return { blocks };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};
