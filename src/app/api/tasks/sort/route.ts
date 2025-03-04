import { getAuthStatus } from '@/utils/auth';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';

export const PATCH = async (request: Request) => {
	try {
		const body = await request.json();
		const { newOrder } = body;

		if (!newOrder) {
			return Response.json({ error: 'New order is required' }, { status: 400 });
		}

		const { authenticated, user } = await getAuthStatus();

		if (!authenticated) {
			return Response.json({ error: en.auth.UNAUTHENTICATED }, { status: 401 });
		}

		let tasks = await db.task.findMany({
			where: { userId: user.id },
			orderBy: { weight: 'desc' },
		});

		// If there is a sort criteria then update all tasks weights
		switch (newOrder) {
			case 'title':
				tasks.sort((a, b) => a.title.localeCompare(b.title));
				break;
			case 'createdAt':
				tasks.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
				break;
			case 'dueDate':
				tasks.sort((a, b) => {
					if (!a.dueDate && !b.dueDate) return 0;
					if (!a.dueDate) return 1;
					if (!b.dueDate) return -1;
					return a.dueDate.getTime() - b.dueDate.getTime();
				});
				break;
			case 'priority':
				tasks.sort((a, b) => {
					const priotities = { A: 3, B: 2, C: 1 };
					if (a.priority && b.priority) {
						return priotities[b.priority] - priotities[a.priority];
					}
					if (a.priority && !b.priority) return -1;
					if (!a.priority && b.priority) return 1;
					return 0;
				});
				break;
			case 'completed':
				tasks.sort((a, b) => {
					if (a.completed && !b.completed) return -1;
					if (!a.completed && b.completed) return 1;
					return 0;
				});
				break;
			default:
				break;
		}

		tasks = tasks.map((task, index) => ({ ...task, weight: (tasks.length - index) * 10000 }));

		// Set new weights
		await Promise.all(
			tasks.map(task =>
				db.task.update({
					where: { id: task.id },
					data: { weight: task.weight },
				}),
			),
		);

		return Response.json({ tasks }, { status: 200 });
	} catch {
		return Response.json({ error: en.SOMETHING_WENT_WRONG }, { status: 500 });
	}
};
