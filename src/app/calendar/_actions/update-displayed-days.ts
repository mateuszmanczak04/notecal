'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import UpdateDisplayedDaysSchema from '@/schemas/update-displayed-days-schema';
import { z } from 'zod';

const updateDisplayedDays = async (
	values: z.infer<typeof UpdateDisplayedDaysSchema>,
) => {
	const validatedFields = UpdateDisplayedDaysSchema.safeParse(values);

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
				displayedDays: validatedFields.data.displayedDays,
			},
		});

		return { success: true };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateDisplayedDays;
