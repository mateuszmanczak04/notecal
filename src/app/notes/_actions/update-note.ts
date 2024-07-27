'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { z } from 'zod';

const UpdateNoteSchema = z.object({
	id: z.string().min(1, en.notes.ID_REQUIRED),
	startTime: z.coerce.date().optional(),
	endTime: z.coerce.date().optional(),
	content: z.string().optional(),
	courseId: z.string().optional(),
});

const updateNote = async (values: z.infer<typeof UpdateNoteSchema>) => {
	const validatedFields = UpdateNoteSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	const data = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const updatedNote = await db.note.update({
			where: { id: data.id, userId: session.user.id },
			data: {
				...data,
				startTime: data.startTime || undefined,
				endTime: data.endTime || undefined,
			},
		});

		return { updatedNote };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateNote;
