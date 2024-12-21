'use server';

import { getAuthStatus } from '@/lib/auth';
import db from '@/lib/db';
import { en } from '@/lib/dictionary';

const getEmailConfirmed = async () => {
	try {
		const { authenticated, user: authUser } = await getAuthStatus();

		if (!authenticated) return { error: en.auth.UNAUTHENTICATED };

		const user = await db.user.findUnique({
			where: {
				id: authUser.id,
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
