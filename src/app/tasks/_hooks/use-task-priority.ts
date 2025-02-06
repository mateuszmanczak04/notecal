import { useToast } from '@/components/toast/use-toast';
import { Task as T_Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateTask from '../_actions/update-task';

export const useTaskPriority = (task: T_Task) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: updateTask,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const handleSelect = (newPriority: any) => {
		mutate({
			id: task.id,
			priority: newPriority,
		});
	};

	return {
		isPending,
		handleSelect,
	};
};
