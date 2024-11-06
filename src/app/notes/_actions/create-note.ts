'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { z } from 'zod';

const CreateNoteSchema = z.object({
	id: z.string().optional(),
	courseId: z.string().min(1, { message: en.courses.ID_REQUIRED }),
	content: z.string().default(''),
	startTime: z.date(),
	endTime: z.date(),
});

const createNote = async (values: z.infer<typeof CreateNoteSchema>) => {
	const validatedFields = CreateNoteSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const { id, courseId, content, startTime, endTime } = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		// Set seconds and milliseconds to 0:
		const properStartTime = new Date(new Date(startTime.setSeconds(0)).setMilliseconds(0));
		const properEndTime = new Date(new Date(endTime.setSeconds(0)).setMilliseconds(0));

		const newNote = await db.note.create({
			data: {
				id,
				courseId,
				startTime: properStartTime,
				endTime: properEndTime,
				userId: session.user.id,
				content,
			},
		});

		return { newNote };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default createNote;
