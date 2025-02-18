import { useToast } from '@/components/toast/use-toast';
import { useSettings } from '@/hooks/use-settings';
import { useTasks } from '@/hooks/use-tasks';
import { type Task as T_Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import updateManyTasks from '../_actions/update-many-tasks';

type T_Props = {
	courseId?: string;
};

export const useTasksFunctionality = ({ courseId }: T_Props) => {
	const { data: tasks, error, isPending } = useTasks();
	const { setTasksOrder } = useSettings();
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate } = useMutation({
		mutationFn: updateManyTasks,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});
	const [hasChangedOrder, setHasChangesOrder] = useState(false);

	const wantedTasks = courseId
		? tasks?.filter(task => task.courseId === courseId).toSorted((a, b) => b.courseWeight - a.courseWeight)
		: tasks;

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
