'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { type Task } from '@prisma/client';
import { FC } from 'react';
import useTasks from '../_hooks/use-tasks';
import Course from './course';
import Description from './description';
import DueDate from './due-date';
import Menu from './menu';
import Priority from './priority';
import Title from './title';

interface TaskProps {
	task: Task;
}

const Task: FC<TaskProps> = ({
	task: { id, title, description, completed, courseId, dueDate, priority },
}) => {
	const { update: updateTask } = useTasks();

	const handleToggleTask = (newValue: boolean) => {
		updateTask({ id, completed: newValue });
	};

	return (
		<div className='flex gap-4 border-b border-gray-200 pb-4 sm:p-4'>
			<Checkbox
				checked={completed}
				onCheckedChange={handleToggleTask}
				className='h-6 w-6 rounded-full'
			/>
			<div className='min-w-0'>
				<Title id={id} title={title} completed={completed} />
				<Description id={id} description={description} completed={completed} />
				{!completed && (
					<div className='mt-2 flex flex-wrap gap-2'>
						<Course id={id} courseId={courseId} />
						<DueDate id={id} dueDate={dueDate} />
						<Priority id={id} priority={priority} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Task;
