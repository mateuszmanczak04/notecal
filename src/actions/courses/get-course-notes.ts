'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { GetCourseNotesSchema } from '@/schemas';
import { z } from 'zod';

const getCourseNotes = async (values: z.infer<typeof GetCourseNotesSchema>) => {
	const validatedFields = GetCourseNotesSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		let notes = await db.note.findMany({
			where: {
				userId: session.user.id,
				courseId: validatedFields.data.courseId,
			},
		});

		return { notes };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};

export default getCourseNotes;
