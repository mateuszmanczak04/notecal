'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { z } from 'zod';

const DeleteNoteSchema = z.object({
	id: z.string().min(1, { message: en.notes.ID_REQUIRED }),
});

const deleteNote = async (values: z.infer<typeof DeleteNoteSchema>) => {
	const validatedFields = DeleteNoteSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		await db.note.delete({
			where: { id: validatedFields.data.id, userId: session.user.id },
		});

		return { deleted: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default deleteNote;
