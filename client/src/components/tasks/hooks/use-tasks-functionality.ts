import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSettings } from '../../../hooks/use-settings';
import { useTasks } from '../../../hooks/use-tasks';
import { T_Task } from '../../../types';
import { BACKEND_DOMAIN } from '../../../utils/app-domain';
import { useToast } from '../../toast/use-toast';

type T_Props = {
	courseId?: string;
};

export const useTasksFunctionality = ({ courseId }: T_Props) => {
	const { data: tasks, error, isPending } = useTasks();
	const { setTasksOrder } = useSettings();
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate } = useMutation({
		mutationFn: async (data: { tasks: T_Task[] }) =>
			await fetch(`${BACKEND_DOMAIN}/api/tasks`, {
				method: 'PUT',
				body: JSON.stringify(data),
			}).then(res => res.json()),
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});
	const [hasChangedOrder, setHasChangesOrder] = useState(false);

	const sortedTasks = tasks ? [...tasks].sort((a, b) => a.weight - b.weight) : [];

	const wantedTasks = sortedTasks.filter(task => (courseId ? task.courseId === courseId : true));

	const handleReorder = (newTasks: T_Task[]) => {
		const newTasksWithProperWeights = newTasks.map((task, index) => ({
			...task,
			weight: courseId ? task.weight : (newTasks.length - 1 - index) * 10000,
			courseWeight: courseId ? (newTasks.length - 1 - index) * 10000 : task.courseWeight,
		}));
		queryClient.setQueryData(['tasks'], newTasksWithProperWeights);
		setHasChangesOrder(true);
	};

	const handleSaveNewOrder = () => {
		const tasks = queryClient.getQueryData(['tasks']) as T_Task[];
		mutate({ tasks });
		setHasChangesOrder(false);
		setTasksOrder('custom');
	};

	return { tasks: wantedTasks, handleSaveNewOrder, handleReorder, hasChangedOrder, error, isPending };
};
