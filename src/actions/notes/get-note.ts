'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { GetNoteSchema } from '@/schemas';
import { z } from 'zod';

export const getNote = async (values: z.infer<typeof GetNoteSchema>) => {
	const validatedFields = GetNoteSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const id = validatedFields.data.id;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		let note = await db.note.findUnique({
			where: { userId: session.user.id, id },
		});

		if (!note) {
			return { error: 'Note does not exist.' };
		}

		return { note };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};
