import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../components/toast/use-toast';
import { T_Task, T_TaskPriority } from '../../../types';

export const useTaskPriority = (task: T_Task) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { priority: T_TaskPriority }) =>
			await fetch(`/api/tasks/${task.id}`, {
				method: 'PATCH',
				body: JSON.stringify(data),
			}).then(res => res.json()),
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const updateTaskPriority = (newPriority: T_TaskPriority) => {
		mutate({
			priority: newPriority,
		});
	};

	return {
		isPending,
		updateTaskPriority: updateTaskPriority,
	};
};
