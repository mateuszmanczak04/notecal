'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const GetNoteStartTimeSchema = z.object({
	id: z.string(),
});

export const getNoteStartTime = async (
	values: z.infer<typeof GetNoteStartTimeSchema>,
) => {
	const validatedFields = GetNoteStartTimeSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		const note = await db.note.findFirst({
			where: { userId: session.user.id, id: validatedFields.data.id },
			select: { startTime: true },
		});

		return { startTime: note?.startTime };
	} catch (error) {
		return { error: 'Something went wrong' };
	}
};
