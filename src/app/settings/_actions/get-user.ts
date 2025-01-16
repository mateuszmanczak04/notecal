'use server';

import logout from '@/app/auth/_actions/logout';
import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';

export type LimitedUser = {
	id: string;
	email: string;
	emailVerified: boolean;
	zoomLevel: number;
	defaultNoteDuration: number;
	displayedDays: number;
	orderTasks: string;
	language: string;
};

/**
 * Fetch user from database and return only public properties.
 */
const getUser = async (): Promise<LimitedUser> => {
	try {
		const { authenticated, user: authUser } = await getAuthStatus();

		if (!authenticated) {
			logout();
			throw new Error('User is not authenticated');
		}

		const user = await db.user.findUnique({ where: { id: authUser.id } });

		if (!user) {
			logout();
			throw new Error('User not found');
		}

		const limitedUser: LimitedUser = {
			id: user.id,
			email: user.email,
			emailVerified: !!user.emailVerified,
			zoomLevel: user.zoomLevel,
			defaultNoteDuration: user.defaultNoteDuration,
			displayedDays: user.displayedDays,
			orderTasks: user.orderTasks,
			language: user.language,
		};

		return limitedUser;
	} catch {
		// TODO: think about how to fix this issue the better way
		logout();
		throw new Error(en.SOMETHING_WENT_WRONG);
	}
};

export default getUser;
