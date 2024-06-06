'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { z } from 'zod';

const CreateNoteSchema = z.object({
	courseId: z.string(),
	content: z.string(),
	startTime: z.date(),
});

const createNote = async (values: z.infer<typeof CreateNoteSchema>) => {
	const validatedFields = CreateNoteSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { courseId, content, startTime } = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		const newNote = await db.note.create({
			data: {
				courseId,
				startTime,
				endTime: new Date(startTime.getTime() + 3600_000), // 1h duration
				userId: session.user.id,
				content,
			},
		});

		return { newNote };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};

export default createNote;