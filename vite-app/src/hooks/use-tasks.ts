import { useQuery } from '@tanstack/react-query';
import { T_Task } from '../types';

export const useTasks = () => {
	return useQuery({
		queryKey: ['tasks'],
		queryFn: async () =>
			await fetch('/api/tasks')
				.then(res => res.json())
				.then(res => res.tasks as T_Task[])
				.then(tasks => tasks.map(t => ({ ...t, dueDate: t.dueDate ? new Date(t.dueDate) : null })))
				.catch(() => []),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
