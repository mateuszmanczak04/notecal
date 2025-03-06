import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../../../components/toast/use-toast';
import { T_Task } from '../../../types';
import { BACKEND_DOMAIN } from '../../../utils/app-domain';

export const useTaskDueDate = (task: T_Task) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { dueDate: Date | null }) =>
			await fetch(`${BACKEND_DOMAIN}/api/tasks/${task.id}`, {
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

	const updateTaskDueDate = (newDueDate: Date | null) => {
		if (newDueDate === task.dueDate) return;
		mutate({ dueDate: newDueDate });
	};

	return {
		isPending,
		updateTaskDueDate,
	};
};
