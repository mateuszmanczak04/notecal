'use client';

import { type Task } from '@prisma/client';
import { FC, useTransition } from 'react';
import Course from './course';
import DueDate from './due-date';
import Priority from './priority';
import { Checkbox } from '@/components/ui/checkbox';
import Menu from './menu';
import updateTask from '../_actions/update-task';
import { cn } from '@/lib/utils';
import LocalTasks from '@/lib/local-tasks';
import Title from './title';

interface TaskProps {
	task: Task;
}

const Task: FC<TaskProps> = ({
	task: { id, title, description, completed, courseId, dueDate, priority },
}) => {
	const [_, startTransition] = useTransition();

	const handleToggleTask = (newValue: boolean) => {
		startTransition(async () => {
			// TODO: optimistic updates
			updateTask({ id, completed: newValue });
			await LocalTasks.update(id, { completed: newValue });
		});
	};

	return (
		<div className='flex gap-4 border-b border-gray-200 p-4'>
			<Checkbox checked={completed} onCheckedChange={handleToggleTask} />
			<div className='flex flex-1 flex-col'>
				<Title id={id} title={title} completed={completed} />
				<p className={cn('mt-1 text-neutral-500', completed && 'line-through')}>
					{description}
				</p>
				{!completed && (
					<div className='mt-2 flex gap-2'>
						<Course id={id} courseId={courseId} />
						<DueDate id={id} dueDate={dueDate} />
						<Priority id={id} priority={priority} />
					</div>
				)}
			</div>
			<Menu taskId={id} />
		</div>
	);
};

export default Task;
