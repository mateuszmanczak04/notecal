'use client';

import { useAppContext } from '@/app/_components/app-context';
import { Checkbox } from '@/components/checkbox';
import { cn } from '@/utils/cn';
import { type Task } from '@prisma/client';
import { useTransition } from 'react';

type Props = {
	task: Task;
};

// TODO: fix
const Task = ({ task: { id, title, completed, courseId, dueDate, priority, description } }: Props) => {
	const { updateTask } = useAppContext();
	const [isPending, startTransition] = useTransition();

	const toggleCompleted = () => {
		startTransition(async () => {
			await updateTask({ id, completed: !completed });
		});
	};

	const updateTitle = (title: string) => {
		startTransition(async () => {
			await updateTask({ id, title });
		});
	};

	const updateDescription = (description: string) => {
		startTransition(async () => {
			await updateTask({ id, description });
		});
	};

	const updatePriority = (priority: 'A' | 'B' | 'C') => {
		startTransition(async () => {
			await updateTask({ id, priority });
		});
	};

	return (
		<div
			className={cn(
				'flex cursor-pointer select-none gap-3 rounded-xl bg-neutral-100 p-2 shadow-none dark:bg-neutral-700',
				isPending && 'pointer-events-none opacity-50',
			)}>
			<Checkbox checked={completed} onClick={toggleCompleted} className='size-4 bg-white dark:bg-neutral-600' />
			<div>
				<p className={cn('font-semibold', completed && 'line-through opacity-50')}>{title}</p>
				{description && <p className={cn('text-sm', completed && 'line-through opacity-50')}>{description}</p>}
				{dueDate && !completed && (
					<p className='mt-1 rounded-xl bg-neutral-200 px-2 py-1 text-sm dark:bg-neutral-600'>
						{dueDate.toDateString()}
					</p>
				)}
			</div>
		</div>
	);
};

export default Task;
