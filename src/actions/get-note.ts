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

		console.log(session);

		let note = await db.note.findUnique({
			where: { userId: session.user.id, id },
		});

		console.log('note', note);

		if (!note) {
			return { error: 'Note does not exist.' };
		}

		return { note };
	} catch (error) {
		console.log(error);
		return { error: 'Something went wrong.' };
	}
};
