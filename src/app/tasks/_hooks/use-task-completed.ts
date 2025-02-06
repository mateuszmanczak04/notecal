import { useToast } from '@/components/toast/use-toast';
import { Task as T_Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateTask from '../_actions/update-task';

export const useTaskCompleted = (task: T_Task) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending: isTaskCompletedChangePending } = useMutation({
		mutationFn: updateTask,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const handleToggleTaskCompleted = (newCompleted: boolean) => {
		if (newCompleted === task.completed) return;
		mutate({ id: task.id, completed: newCompleted });
	};

	return {
		isTaskCompletedChangePending,
		handleToggleTaskCompleted,
	};
};
