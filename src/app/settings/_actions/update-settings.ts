'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';

export type T_UpdateSettingsInput = {
	language?: string;
	displayedDays?: number;
	defaultNoteDuration?: number;
};

export type T_UpdateSettingsResult = Promise<{ error: string } | { message: string }>;

const updateSettings = async ({
	language,
	displayedDays,
	defaultNoteDuration,
}: T_UpdateSettingsInput): T_UpdateSettingsResult => {
	try {
		const { authenticated, user: authUser } = await getAuthStatus();

		if (!authenticated) {
			return { error: en.auth.UNAUTHENTICATED };
		}

		await db.user.update({
			where: {
				id: authUser.id,
			},
			data: {
				language,
				displayedDays,
				defaultNoteDuration,
			},
		});

		return { message: 'Settings updated successfully' };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateSettings;
