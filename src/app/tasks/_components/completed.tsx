'use client';

import { useAppContext } from '@/app/_components/app-context';
import { Checkbox } from '@/components/checkbox';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useTransition } from 'react';

type Props = {
	task: Task;
};

const Completed = ({ task }: Props) => {
	const { updateTask } = useAppContext();
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
