import getTasks from '@/app/tasks/_actions/get-tasks';
import useSettings from '@/app/settings/_hooks/use-settings';
import { useQuery } from '@tanstack/react-query';

/**
 * Uses react query to get user tasks from the backend.
 */
const useTasks = () => {
	const { settings } = useSettings();

	const { data, isPending, error } = useQuery({
		queryKey: ['tasks'],
		queryFn: async () => {
			// if server action returns error message, throw it so it
			// is accessible as result of useQuery
			const { tasks, error } = await getTasks();
			if (error) throw new Error(error);
			return { tasks };
		},
		staleTime: Infinity,
		enabled: !!settings, // don't fetch tasks if settings are not ready yet
	});

	return { tasks: data?.tasks, isPending, error };
};

export default useTasks;
