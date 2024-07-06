'use client';

import { type Task } from '@prisma/client';
import { FC, useTransition } from 'react';
import Course from './course';
import { EllipsisVertical } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import DueDate from './due-date';
import Priority from './priority';
import { Checkbox } from '@/components/ui/checkbox';
import Menu from './menu';
import updateTask from '../_actions/update-task';
import queryClient from '@/lib/query-client';

interface TaskProps {
	task: Task;
}

const Task: FC<TaskProps> = ({
	task: { id, title, description, completed, courseId, dueDate, priority },
}) => {
	const [isPending, startTransition] = useTransition();
	const handleToggleTask = (newValue: boolean) => {
		startTransition(() => {
			updateTask({ id, completed: newValue });

			// Also update local task value:
			queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
				const oldTasks = old.tasks;
				return {
					tasks: oldTasks.map(task => {
						if (task.id === id)
							return {
								...task,
								completed: newValue,
							};
						return task;
					}),
				};
			});
		});
	};

	return (
		<div className='flex gap-4 border-b border-gray-200 p-4'>
			<Checkbox checked={completed} onCheckedChange={handleToggleTask} />
			<div className='flex flex-1 flex-col'>
				<p className='font-bold'>{title}</p>
				<p className='mt-1 text-neutral-500'>{description}</p>
				<div className='mt-2 flex gap-2'>
					<Course id={id} courseId={courseId} />
					<DueDate id={id} dueDate={dueDate} />
					<Priority id={id} priority={priority} />
				</div>
			</div>
			<Menu taskId={id} />
		</div>
	);
};

export default Task;
