'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { type Task } from '@prisma/client';
import useTasks from '../_hooks/use-tasks';
import Course from './course';
import Description from './description';
import DueDate from './due-date';
import Priority from './priority';
import Title from './title';

type Props = {
	task: Task;
};

const Task = ({ task }: Props) => {
	const { id, description, completed, priority } = task;
	const { update: updateTask } = useTasks();

	const handleToggleTask = (newValue: boolean) => {
		if (newValue === completed) return;

		updateTask({ id, completed: newValue });
	};

	return (
		<div className='flex gap-4 border-b border-neutral-200 pb-4 sm:p-4'>
			<Checkbox
				checked={completed}
				onCheckedChange={handleToggleTask}
				className='rounded-full'
				aria-label='task completed checkbox'
				title='task completed checkbox'
			/>
			<div className='min-w-0'>
				<Title task={task} />
				<Description
					id={id}
					description={description}
					completed={completed}
				/>
				{!completed && (
					<div className='mt-2 flex flex-wrap gap-2'>
						{/* Course */}
						<Course task={task} />

						{/* Due date */}
						<DueDate task={task} />

						{/* Priority */}
						<Priority id={id} priority={priority} />
					</div>
				)}
			</div>
		</div>
	);
};

export default Task;
