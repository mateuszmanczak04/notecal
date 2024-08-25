import useSettings from '@/app/settings/_hooks/use-settings';
import getTasks from '@/app/tasks/_actions/get-tasks';
import queryClient from '@/lib/query-client';
import { Task, TaskPriority } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import createTask from '../_actions/create-task';
import deleteTask from '../_actions/delete-task';
import updateTask from '../_actions/update-task';

type CreateTaskSchema = {
	id?: string;
	title: string;
	description: string;
	courseId: string | null;
	priority: TaskPriority | null;
	dueDate: Date | null;
	completed?: boolean;
};

type TaskWithLoading = Task & { loading?: boolean };

type UpdateTaskSchema = {
	id: string;
	courseId?: string | null;
	completed?: boolean;
	title?: string;
	description?: string;
	dueDate?: Date | null;
	priority?: TaskPriority | null;
};

// Returns a temporary note with fake fields:
// extended by "loading: true" field:
const createTempTask = (values: CreateTaskSchema): TaskWithLoading => ({
	...values,
	id: crypto.randomUUID(),
	userId: '',
	loading: true,
	createdAt: new Date(),
	completed: values.completed || false,
});

const useTasks = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['tasks'],
		queryFn: async () => {
			const { tasks, error } = await getTasks();
			if (error) throw new Error(error);
			return tasks;
		},
	});
	const { settings } = useSettings();

	// Sort
	const sort = async (criteria: string) => {
		await queryClient.setQueryData(['tasks'], (tasks: Task[]) => {
			switch (criteria) {
				case 'createdAt':
					return tasks.toSorted((a, b) =>
						a.createdAt < b.createdAt ? 1 : -1,
					);
				case 'completed':
					return tasks.toSorted((a, b) => {
						if (a.completed && !b.completed) return 1;
						return -1;
					});
				case 'dueDate':
					return tasks.toSorted((a, b) => {
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
					return tasks.toSorted((a, b) => {
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
					return tasks.toSorted((a, b) =>
						a.title > b.title ? 1 : -1,
					);
				default:
					return tasks;
			}
		});
	};

	// Inserting
	const { mutate: add } = useMutation({
		mutationFn: async (values: CreateTaskSchema) => {
			const { newTask, error } = await createTask(values);
			if (error) throw new Error(error);
			return newTask;
		},
		onMutate: async (values: CreateTaskSchema) => {
			await queryClient.cancelQueries({ queryKey: ['tasks'] });
			const previousTasks = queryClient.getQueryData(['tasks']);

			const newTempTask = createTempTask(values);

			await queryClient.setQueryData(['tasks'], (oldTasks: Task[]) => [
				...oldTasks,
				newTempTask,
			]);
			if (settings) {
				await sort(settings.orderTasks);
			}

			return previousTasks;
		},
		onError: (_err, _variables, context) => {
			// Rollback previous state
			queryClient.setQueryData(['tasks'], context);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	// Updating
	const { mutate: update } = useMutation({
		mutationFn: async (values: UpdateTaskSchema) => {
			const { updatedTask, error } = await updateTask(values);
			if (error) throw new Error(error);
			return updatedTask;
		},
		onMutate: async (values: UpdateTaskSchema) => {
			await queryClient.cancelQueries({ queryKey: ['tasks'] });
			const previousTasks = queryClient.getQueryData(['tasks']);

			await queryClient.setQueryData(['tasks'], (oldTasks: Task[]) => {
				return oldTasks.map(task => {
					if (task.id === values.id) {
						return { ...task, ...values };
					}
					return task;
				});
			});
			if (settings) {
				await sort(settings.orderTasks);
			}

			return previousTasks;
		},
		onError: (_err, _variables, context) => {
			// Rollback previous state
			queryClient.setQueryData(['tasks'], context);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	// Deleting
	const { mutate: remove } = useMutation({
		mutationFn: async (id: string) => {
			const { error } = await deleteTask({ id });
			if (error) throw new Error(error);
			return id;
		},
		onMutate: async (id: string) => {
			await queryClient.cancelQueries({ queryKey: ['tasks'] });
			const previousTasks = queryClient.getQueryData(['tasks']);

			await queryClient.setQueryData(['tasks'], (oldTasks: Task[]) => {
				return oldTasks.filter(task => {
					if (task.id === id) {
						return null;
					}
					return task;
				});
			});

			return previousTasks;
		},
		onError: (_err, _variables, context) => {
			// Rollback previous state
			queryClient.setQueryData(['tasks'], context);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	return { tasks: data, isPending, error, add, update, remove, sort };
};

export default useTasks;
