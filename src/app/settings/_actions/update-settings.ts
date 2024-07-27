'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';
import { z } from 'zod';

const UpdateSettingsSchema = z.object({
	theme: z.enum(['light', 'dark']).optional(),
	orderTasks: z
		.enum(['title', 'createdAt', 'dueDate', 'priority', 'completed'])
		.optional(),
	language: z.enum(['en']).optional(),
	displayedDays: z.coerce
		.number({
			required_error: en.settings.DISPLAYED_DAYS_REQUIRED,
		})
		.optional(),
	defaultNoteDuration: z.coerce
		.number({
			required_error: en.settings.DEFAULT_NOTE_DURATION_REQUIRED,
		})
		.optional(),
	zoomLevel: z.number().int().gte(1).lte(5).optional(),
});

const updateSettings = async (values: z.infer<typeof UpdateSettingsSchema>) => {
	const validatedFields = UpdateSettingsSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: en.INVALID_DATA };
	}

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		const setting = await db.settings.findUnique({
			where: { userId: session.user.id },
		});

		let updatedSettings;

		if (!setting) {
			updatedSettings = await db.settings.create({
				data: {
					userId: session.user.id,
					...validatedFields.data,
				},
			});
		} else {
			updatedSettings = await db.settings.update({
				where: {
					userId: session.user.id,
				},
				data: {
					...validatedFields.data,
				},
			});
		}

		return { updatedSettings };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateSettings;
