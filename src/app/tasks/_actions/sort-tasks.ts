'use server';

import getUser from '@/app/settings/_actions/get-user';
import { T_TasksOrder } from '@/hooks/use-settings';
import db from '@/utils/db';
import { en } from '@/utils/dictionary';
import { Task } from '@prisma/client';

export type T_SortTasksInput = {
	newOrder?: T_TasksOrder;
};

export type T_SortTasksResult = Promise<{ error: string } | { tasks: Task[] }>;

/**
 * Iterates through all tasks and updates their weights based on the new sort criteria
 */
export const sortTasks = async ({ newOrder }: T_SortTasksInput): T_SortTasksResult => {
	try {
		const user = await getUser();

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
				tasks.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
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
				console.log('SORTING BY PRIORITY');
				tasks.sort((a, b) => {
					const priotities = { A: 3, B: 2, C: 1 };
					if (a.priority && b.priority) {
						return priotities[b.priority] - priotities[a.priority];
					}
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

		console.log('tasks', tasks);

		return { tasks };
	} catch {
		return { error: en.SOMETHING_WENT_WRONG };
	}
};
