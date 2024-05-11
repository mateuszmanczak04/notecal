import queryClient from '@/lib/query-client';
import { Task } from '@prisma/client';

const sortTasks = (order: string) => {
	queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
		const oldTasks = old.tasks;
		if (!oldTasks || oldTasks.length === 0) return { tasks: [] };
		switch (order) {
			case 'title':
				return {
					tasks: oldTasks.toSorted((a, b) => (a.title > b.title ? 1 : -1)),
				};
			case 'completed':
				return {
					tasks: oldTasks.toSorted((a, b) => {
						if (a.completed && !b.completed) {
							return -1;
						}
						if (b.completed && !a.completed) {
							return 1;
						}
						return 0;
					}),
				};
			case 'dueDate':
				return {
					tasks: oldTasks.toSorted((a, b) => {
						if (!a.dueDate && !b.dueDate) return 0;
						if (!a.dueDate) return 1;
						if (!b.dueDate) return -1;
						return a.dueDate > b.dueDate ? 1 : -1;
					}),
				};
			case 'createdAt':
				return {
					tasks: oldTasks.toSorted((a, b) =>
						a.createdAt > b.createdAt ? -1 : 1,
					),
				};
			case 'priority':
				return {
					tasks: oldTasks.toSorted((a, b) => {
						if (!a.priority && !b.priority) return 0;
						if (!a.priority) return 1;
						if (!b.priority) return -1;
						return a.priority > b.priority ? 1 : -1;
					}),
				};
			default:
				return { tasks: oldTasks };
		}
	});
};

export default sortTasks;
