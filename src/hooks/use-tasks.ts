import { getTasks } from '@/actions/get-tasks';
import { useQuery } from '@tanstack/react-query';

const useTasks = () =>
	useQuery({
		queryKey: ['tasks'],
		queryFn: async () => await getTasks(),
	});

export default useTasks;
