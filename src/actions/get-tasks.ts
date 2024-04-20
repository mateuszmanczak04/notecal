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
			include: { course: true },
			orderBy: { title: 'asc' },
		});

		const processedTasks = tasks.map(task => ({
			id: task.id,
			title: task.title,
			description: task.description,
			courseName: task?.course?.name || '',
			courseId: task?.course?.id || '',
			priority: task.priority,
			dueDate: task.dueDate,
			completed: task.completed,
			createdAt: task.createdAt,
		}));

		return { tasks: processedTasks };
	} catch (err) {
		return { error: 'Something went wrong.' };
	}
};
