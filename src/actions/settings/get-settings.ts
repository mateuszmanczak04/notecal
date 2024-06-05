'use server';

import { auth } from '@/auth';
import db from '@/lib/db';

const getSettings = async () => {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		let settings = await db.settings.findUnique({
			where: { userId: session.user.id },
		});

		if (!settings) {
			settings = await db.settings.create({
				data: {
					userId: session.user.id,
					language: 'en',
				},
			});
		}

		return { settings };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};

export default getSettings;
