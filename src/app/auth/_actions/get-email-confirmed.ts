'use server';

import { auth } from '@/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';

const getEmailConfirmed = async () => {
	try {
		const session = await auth();

		if (!session?.user) return { error: en.auth.UNAUTHENTICATED };

		const user = await db.user.findUnique({
			where: {
				id: session.user.id,
			},
		});

		return {
			emailConfirmed: user?.emailVerified !== null,
		};
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default getEmailConfirmed;
