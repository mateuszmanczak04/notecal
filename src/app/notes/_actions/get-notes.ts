'use server';

import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { fromZonedTime } from 'date-fns-tz';
import { cache } from 'react';

const getNotes = cache(async () => {
	const { authenticated, user } = await getAuthStatus();

	if (!authenticated) return [];

	try {
		const notes = await db.note.findMany({
			where: {
				userId: user.id,
			},
			orderBy: {
				startTime: 'desc',
			},
		});

		return notes.map(note => ({
			...note,
			startTime: fromZonedTime(note.startTime, 'Europe/Warsaw'),
			endTime: fromZonedTime(note.endTime, 'Europe/Warsaw'),
		}));
	} catch {
		return [];
	}
});

export default getNotes;
