import { getTasks } from '@/actions/get-tasks';
import { useQuery } from '@tanstack/react-query';

const useTasks = () =>
	useQuery({
		queryKey: ['tasks'],
		// by default fetch tasks by newest first:
		queryFn: async () => await getTasks({ orderBy: 'createdAt' }),
	});

export default useTasks;
