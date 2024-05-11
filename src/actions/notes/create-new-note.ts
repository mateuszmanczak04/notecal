'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { CreateNewNoteSchema } from '@/schemas';
import { z } from 'zod';

export const createNewNote = async (
	values: z.infer<typeof CreateNewNoteSchema>,
) => {
	const validatedFields = CreateNewNoteSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const courseId = validatedFields.data.courseId;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		const newNote = await db.note.create({
			data: {
				courseId,
				startTime: new Date(),
				endTime: new Date(Date.now() + 3600_000), // 1h duration
				userId: session.user.id,
				content: 'Empty note',
			},
		});

		return { newNote };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};
