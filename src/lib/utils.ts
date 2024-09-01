import { OrderTasksEnum, Task } from '@prisma/client';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const COLORS = [
	{ description: 'Blue', hex: '#2563eb' },
	{ description: 'Green', hex: '#16a34a' },
	{ description: 'Yellow', hex: '#ca8a04' },
	{ description: 'Orange', hex: '#ea580c' },
	{ description: 'Red', hex: '#dc2626' },
	{ description: 'Pink', hex: '#db2777' },
	{ description: 'Purple', hex: '#9333ea' },
];

export const cmdOrCtrl = () =>
	window.navigator.platform.match(/^Mac/) ? 'cmd' : 'ctrl';

export const getSortedTasks = (tasks: Task[], criteria: OrderTasksEnum) => {
	const initiallySortedTasks = tasks.toSorted((a, b) =>
		a.createdAt < b.createdAt ? 1 : -1,
	);

	switch (criteria) {
		case 'createdAt':
			return initiallySortedTasks.toSorted((a, b) =>
				a.createdAt < b.createdAt ? 1 : -1,
			);
		case 'completed':
			return initiallySortedTasks.toSorted((a, b) => {
				if (a.completed && b.completed) return 0;
				if (!a.completed && !b.completed) return 0;
				if (a.completed && !b.completed) return -1;
				return 1;
			});
		case 'dueDate':
			return initiallySortedTasks.toSorted((a, b) => {
				if (!a.dueDate && !b.dueDate) return 0;
				if (a.dueDate && b.dueDate) {
					if (a.dueDate > b.dueDate) {
						return 1;
					} else {
						return -1;
					}
				} else if (a.dueDate && !b.dueDate) {
					return -1;
				} else if (!a.dueDate && b.dueDate) {
					return 1;
				}

				return -1;
			});
		case 'priority':
			return initiallySortedTasks.toSorted((a, b) => {
				if (a.priority === b.priority) return 0;
				if (a.priority && b.priority) {
					if (a.priority > b.priority) {
						return 1;
					} else {
						return -1;
					}
				} else if (a.priority && !b.priority) {
					return -1;
				} else if (!a.priority && b.priority) {
					return 1;
				}

				return -1;
			});
		case 'title':
			return initiallySortedTasks.toSorted((a, b) => {
				if (a.title === b.title) return 0;
				return a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()
					? 1
					: -1;
			});
		default:
			return initiallySortedTasks;
	}
};
