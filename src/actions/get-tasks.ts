'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';

export const getTasks = async () => {
	try {
		const session = await auth();

		if (!session?.user?.id) {
			return { error: 'Unauthorized.' };
		}

		const tasks = await db.task.findMany({
			where: { userId: session.user.id },
			orderBy: { title: 'asc' },
		});

		return { tasks };
	} catch (error) {
		return { error: 'Something went wrong.' };
	}
};
