'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';

const getNotes = async () => {
	const { authenticated, user } = await getAuthStatus();

	if (!authenticated) return [];

	try {
		const notes = await db.note.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return notes;
	} catch {
		return [];
	}
};

export default getNotes;
