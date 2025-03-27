import { useQuery } from '@tanstack/react-query';
import { T_Task } from '../types';
import { BACKEND_DOMAIN } from '../utils/app-domain';

export const useTasks = () => {
	return useQuery({
		queryKey: ['tasks'],
		queryFn: async () =>
			await fetch(`${BACKEND_DOMAIN}/api/tasks`)
				.then(res => res.json())
				.then(res => res.tasks as T_Task[])
				.then(tasks => tasks.map(t => ({ ...t, dueDate: t.dueDate ? new Date(t.dueDate) : null })))
				.catch(() => []),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
