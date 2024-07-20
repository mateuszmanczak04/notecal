'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import UpdateDefaultNoteDurationSchema from '@/schemas/update-default-note-duration-schema';
import { z } from 'zod';

const updateDefaultNoteDuration = async (
	values: z.infer<typeof UpdateDefaultNoteDurationSchema>,
) => {
	const validatedFields = UpdateDefaultNoteDurationSchema.safeParse(values);

	if (!validatedFields.success) return { error: en.INVALID_DATA };

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		await db.settings.update({
			where: {
				userId: session.user.id,
			},
			data: {
				defaultNoteDuration: validatedFields.data.defaultNoteDuration,
			},
		});

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateDefaultNoteDuration;
