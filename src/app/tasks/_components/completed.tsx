'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Task } from '@prisma/client';
import { useTransition } from 'react';
import updateTask from '../_actions/update-task';

type Props = {
	task: Task;
};

const Completed = ({ task }: Props) => {
	const [isPending, startTransition] = useTransition();

	const handleToggleTask = (newCompleted: boolean) => {
		if (newCompleted === task.completed) return;

		startTransition(async () => {
			updateTask({ id: task.id, completed: newCompleted });
		});
	};

	return (
		<Checkbox
			checked={task.completed}
			onCheckedChange={handleToggleTask}
			className={cn('rounded-full', isPending && 'opacity-50')}
			aria-label='task completed checkbox'
			title='task completed checkbox'
		/>
	);
};

export default Completed;
