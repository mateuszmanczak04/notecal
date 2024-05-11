import { getTasks } from '@/actions/tasks/get-tasks';
import useSettings from '@/hooks/use-settings';
import { useQuery } from '@tanstack/react-query';

const useTasks = () => {
	const { data } = useSettings();

	return useQuery({
		queryKey: ['tasks'],
		queryFn: async () =>
			await getTasks({ orderBy: data?.settings?.orderTasks || 'createdAt' }),
		staleTime: Infinity,
	});
};

export default useTasks;
