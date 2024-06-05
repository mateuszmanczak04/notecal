'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { z } from 'zod';

const UpdateNoteEndTimeSchema = z.object({
	id: z.string(),
	newEndTime: z.date(),
});

const updateNoteEndTime = async (
	values: z.infer<typeof UpdateNoteEndTimeSchema>,
) => {
	const validatedFields = UpdateNoteEndTimeSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { newEndTime, id } = validatedFields.data;

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
				endTime: newEndTime,
			},
		});

		return { updated: true };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};

export default updateNoteEndTime;
