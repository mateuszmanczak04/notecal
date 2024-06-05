'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { z } from 'zod';

const UpdateNoteContentSchema = z.object({
	id: z.string(),
	newContent: z.string(),
});

const updateNoteContent = async (
	values: z.infer<typeof UpdateNoteContentSchema>,
) => {
	const validatedFields = UpdateNoteContentSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { id, newContent } = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		await db.note.update({
			where: { id, userId: session.user.id },
			data: {
				content: newContent,
			},
		});

		return { updated: true };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};

export default updateNoteContent;
