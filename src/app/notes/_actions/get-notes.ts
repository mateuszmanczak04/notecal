'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { cache } from 'react';

const getNotes = cache(async () => {
	const { authenticated, user } = await getAuthStatus();

	if (!authenticated) return [];

	try {
		const notes = await db.note.findMany({
			where: {
				userId: user.id,
			},
			orderBy: [
				{
					startTime: {
						sort: 'asc',
						nulls: 'last',
					},
				},
				{
					createdAt: 'desc',
				},
			],
		});

		return notes;
	} catch {
		return [];
	}
});

export default getNotes;
