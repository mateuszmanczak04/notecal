import { useQuery } from '@tanstack/react-query';
import getTasks from '../tasks/_actions/get-tasks';

export const useTasks = () => {
	return useQuery({ queryKey: ['tasks'], queryFn: getTasks, refetchOnMount: false, refetchOnWindowFocus: false });
};
