'use server';

import { en } from '@/utils/dictionary';
import { getUser } from '@/utils/get-user';

/**
 * Fetch user from database and return only properties related to their settings.
 */
const getSettings = async () => {
	try {
		const user = await getUser();

		if (!user) return { error: en.auth.UNAUTHENTICATED };

		return {
			defaultNoteDuration: user.defaultNoteDuration,
			displayedDays: user.displayedDays,
			zoomLevel: user.zoomLevel,
			orderTasks: user.orderTasks,
			language: user.language,
		};
	} catch {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default getSettings;
