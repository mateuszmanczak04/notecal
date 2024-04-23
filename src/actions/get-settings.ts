'use server';

import { auth } from '@/auth';

export const getSettings = async () => {
	const session = await auth();

	if (!session?.user?.id) {
		return { error: 'Unauthorized.' };
	}

	return { settings: {} };
};
