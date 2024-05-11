'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { z } from 'zod';

const UpdateNoteStartTimeSchema = z.object({
	id: z.string(),
	newStartTime: z.date(),
});

export const updateNoteStartTime = async (
	values: z.infer<typeof UpdateNoteStartTimeSchema>,
) => {
	const validatedFields = UpdateNoteStartTimeSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { newStartTime, id } = validatedFields.data;

	if (!id) {
		return { error: 'Missing fields.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthenticated.' };
		}

		await db.note.update({
			where: { id, userId: session.user.id },
			data: {
				startTime: newStartTime,
			},
		});

		return { updated: true };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};
