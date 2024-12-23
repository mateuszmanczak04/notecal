'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';

const updateSettings = async (_prevState: any, formData: FormData) => {
	// Text types
	const orderTasks = formData.get('orderTasks')?.toString() || undefined;
	const language = formData.get('language')?.toString() || undefined;

	// Number types, if they come as equal to zero, they become undefined
	const displayedDays = parseInt(formData.get('displayedDays')?.toString() || '') || undefined;
	const defaultNoteDuration = parseInt(formData.get('defaultNoteDuration')?.toString() || '') || undefined;
	const zoomLevel = parseInt(formData.get('zoomLevel')?.toString() || '') || undefined;

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
				orderTasks,
				language,
				displayedDays,
				defaultNoteDuration,
				zoomLevel,
			},
		});

		return { message: 'Settings updated successfully' };
	} catch (error) {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};

export default updateSettings;
