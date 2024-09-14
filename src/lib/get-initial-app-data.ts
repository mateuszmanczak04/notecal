import 'server-only';
import db from './db';
import { en } from './dictionary';
import { getSortedTasks } from './utils';

export const getInitialAppData = async (userId: string) => {
	try {
		const notes = await db.note.findMany({
			where: { userId },
			orderBy: [
				{
					startTime: 'asc',
				},
			],
		});
		const courses = await db.course.findMany({
			where: {
				userId,
			},
			orderBy: {
				name: 'asc',
			},
		});

		let settings = await db.settings.findUnique({
			where: { userId },
		});

		if (!settings) {
			settings = await db.settings.create({
				data: {
					userId,
					language: 'en',
					orderTasks: 'createdAt',
				},
			});
		}

		const tasks = await db.task.findMany({
			where: { userId },
		});

		return {
			tasks: getSortedTasks(tasks, settings?.orderTasks || 'createdAt'),
			notes,
			courses,
			settings,
		};
	} catch {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};
