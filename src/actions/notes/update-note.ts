'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { z } from 'zod';

const UpdateNoteSchema = z.object({
	id: z.string(),
	startTime: z.coerce.date().optional(),
	endTime: z.coerce.date().optional(),
	content: z.string().optional(),
	courseId: z.string().optional(),
});

const updateNote = async (values: z.infer<typeof UpdateNoteSchema>) => {
	const validatedFields = UpdateNoteSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const data = validatedFields.data;

	if (!data.id) {
		return { error: 'Missing fields.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthenticated.' };
		}

		await db.note.update({
			where: { id: data.id, userId: session.user.id },
			data,
		});

		return { updated: true };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};

export default updateNote;
