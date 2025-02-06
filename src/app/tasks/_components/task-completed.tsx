'use client';

import { Checkbox } from '@/components/checkbox';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateTask from '../_actions/update-task';

type T_Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
};

const TaskCompleted = ({ task, forPage = 'tasks' }: T_Props) => {
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

	const handleToggleTask = (newCompleted: boolean) => {
		if (newCompleted === task.completed) return;
		mutate({ id: task.id, completed: newCompleted });
	};

	return (
		<Checkbox
			checked={task.completed}
			onCheckedChange={handleToggleTask}
			className={cn('', isPending && 'pointer-events-none opacity-50', forPage === 'notes' && 'size-5')}
			aria-label='task completed checkbox'
			title='task completed checkbox'
		/>
	);
};

export default TaskCompleted;
