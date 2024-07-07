import getTasks from '@/app/tasks/_actions/get-tasks';
import { useQuery } from '@tanstack/react-query';

const useTasks = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['tasks'],
		queryFn: async () => {
			const { tasks, error } = await getTasks();
			if (error) throw new Error(error);
			return { tasks };
		},
	});

	return { tasks: data?.tasks, isPending, error };
};

export default useTasks;
