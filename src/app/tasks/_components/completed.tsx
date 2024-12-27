'use client';

import { Checkbox } from '@/components/checkbox';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateTask from '../_actions/update-task';

type Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
};

const Completed = ({ task, forPage = 'tasks' }: Props) => {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: updateTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const handleToggleTask = (newCompleted: boolean) => {
		if (newCompleted === task.completed) return;
		mutate({ id: task.id, completed: newCompleted });
	};

	// TODO: when there is an error show a Toast message

	return (
		<Checkbox
			checked={task.completed}
			onCheckedChange={handleToggleTask}
			className={cn(
				'rounded-full',
				isPending && 'pointer-events-none opacity-50',
				forPage === 'notes' && 'size-5',
			)}
			aria-label='task completed checkbox'
			title='task completed checkbox'
		/>
	);
};

export default Completed;
