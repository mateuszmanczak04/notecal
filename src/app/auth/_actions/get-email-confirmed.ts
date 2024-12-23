'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';

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
