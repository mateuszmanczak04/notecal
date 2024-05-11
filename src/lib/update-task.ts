import queryClient from '@/lib/query-client';
import { Task, TaskPriority } from '@prisma/client';

export const updateTaskDueDate = (id: string, dueDate: Date | null) => {
	queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
		const oldTasks = old.tasks;
		return {
			tasks: oldTasks.map(task => {
				if (task.id === id) {
					return { ...task, dueDate };
				}
				return task;
			}),
		};
	});
};

export const toggleTask = (id: string) => {
	queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
		const oldTasks = old.tasks;
		return {
			tasks: oldTasks.map(task => {
				if (task.id === id) {
					return { ...task, completed: !task.completed };
				}
				return task;
			}),
		};
	});
};

export const deleteTask = (id: string) => {
	queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
		const oldTasks = old.tasks;
		return {
			tasks: oldTasks.filter(task => task.id !== id),
		};
	});
};

export const updateTaskPriority = (
	id: string,
	priority: TaskPriority | null,
) => {
	queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
		const oldTasks = old.tasks;
		return {
			tasks: oldTasks.map(task => {
				if (task.id === id) {
					return { ...task, priority };
				}
				return task;
			}),
		};
	});
};

export const updateTaskTitle = (id: string, title: string) => {
	queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
		const oldTasks = old.tasks;
		return {
			tasks: oldTasks.map(task => {
				if (task.id === id) {
					return { ...task, title };
				}
				return task;
			}),
		};
	});
};

export const updateTaskCourseId = (id: string, courseId: string) => {
	queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
		const oldTasks = old.tasks;
		return {
			tasks: oldTasks.map(task => {
				if (task.id === id) {
					return { ...task, courseId };
				}
				return task;
			}),
		};
	});
};
