import getTasks from '@/app/tasks/_actions/get-tasks';
import { useQuery } from '@tanstack/react-query';

export const useTasks = () => {
	return useQuery({ queryKey: ['tasks'], queryFn: getTasks, refetchOnMount: false, refetchOnWindowFocus: false });
};
