'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { UpdateSettingsSchema } from '@/schemas';
import { z } from 'zod';

const updateSettings = async (values: z.infer<typeof UpdateSettingsSchema>) => {
	const validatedFields = UpdateSettingsSchema.safeParse(values);

	if (!validatedFields.success) {
		return { error: 'Invalid fields.' };
	}

	const { language, orderTasks, theme } = validatedFields.data;

	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		const setting = await db.settings.findUnique({
			where: { userId: session.user.id },
		});

		if (!setting) {
			await db.settings.create({
				data: {
					userId: session.user.id,
					language: 'en',
				},
			});
		}

		if (!language && !orderTasks && !theme) {
			return { error: 'Missing fields.' };
		}

		if (language) {
			await db.settings.update({
				where: {
					userId: session.user.id,
				},
				data: {
					language,
				},
			});
		}

		if (orderTasks) {
			await db.settings.update({
				where: {
					userId: session.user.id,
				},
				data: {
					orderTasks,
				},
			});
		}

		if (theme) {
			await db.settings.update({
				where: {
					userId: session.user.id,
				},
				data: {
					theme,
				},
			});
		}

		return { updated: true };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};

export default updateSettings;
