'use client';

import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import LoadingSpinner from '@/components/loading-spinner';
import { useToast } from '@/components/toast/use-toast';
import { useSettings } from '@/hooks/use-settings';
import { useTasks } from '@/hooks/use-tasks';
import { type Task as T_Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Reorder } from 'motion/react';
import { useState } from 'react';
import updateManyTasks from '../_actions/update-many-tasks';
import Task from './task';

/**
 * List of all user's tasks.
 */
const Tasks = () => {
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

	const handleReorder = (newTasks: T_Task[]) => {
		const newTasksWithProperWeights = newTasks.map((task, index) => ({
			...task,
			weight: (newTasks.length - 1 - index) * 10000,
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

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!tasks || tasks.length === 0) {
		return <p className='text-center text-lg text-neutral-500 sm:ml-8'>You don&apos;t have any tasks yet.</p>;
	}

	return (
		<div className='relative'>
			{hasChangedOrder && (
				<Button className='w-full' onClick={handleSaveNewOrder}>
					Save new order
				</Button>
			)}
			<Reorder.Group values={tasks} onReorder={handleReorder}>
				{tasks.map(task => (
					<Task key={task.id} task={task} />
				))}
			</Reorder.Group>
		</div>
	);
};

export default Tasks;
