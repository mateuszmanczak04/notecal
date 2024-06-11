'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { z } from 'zod';

const CreateNoteSchema = z.object({
	courseId: z.string().min(1, { message: en.courses.ID_REQUIRED }),
	content: z.string().optional().default(''),
	startTime: z.date().optional().default(new Date()),
});

const createNote = async (values: z.infer<typeof CreateNoteSchema>) => {
	const validatedFields = CreateNoteSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { courseId, content, startTime } = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.UNAUTHENTICATED };
		}

		const newNote = await db.note.create({
			data: {
				courseId,
				startTime,
				endTime: new Date(startTime.getTime() + 3600_000), // todo - replace it with user settings for default note duration
				userId: session.user.id,
				content,
			},
		});

		return { newNote };
	} catch (error) {
		return { error: 'Something went wrong' };
	}
};

export default createNote;
