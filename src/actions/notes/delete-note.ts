'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const DeleteNoteSchema = z.object({
	id: z.string(),
});

export const deleteNote = async (values: z.infer<typeof DeleteNoteSchema>) => {
	const validatedFields = DeleteNoteSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		await db.note.delete({
			where: { id: validatedFields.data.id, userId: session.user.id },
		});

		return { deleted: true };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};
