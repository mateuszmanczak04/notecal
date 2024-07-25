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
			return { error: en.auth.UNAUTHENTICATED };
		}

		const userSettings = await db.settings.findUnique({
			where: {
				userId: session.user.id,
			},
		});

		if (!userSettings) {
			await db.settings.create({
				data: {
					userId: session.user.id,
					language: 'en',
					orderTasks: 'createdAt',
				},
			});
		}

		const properStartTime = new Date(
			new Date(startTime.setSeconds(0)).setMilliseconds(0),
		);
		const properEndTime = new Date(
			properStartTime.getTime() + userSettings!.defaultNoteDuration * 1000 * 60,
		);

		const newNote = await db.note.create({
			data: {
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
