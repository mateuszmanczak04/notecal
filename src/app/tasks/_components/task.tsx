'use client';

import { type Task } from '@prisma/client';
import Completed from './completed';
import Course from './course';
import Description from './description';
import DueDate from './due-date';
import Priority from './priority';
import Title from './title';

type Props = {
	task: Task;
};

const Task = ({ task }: Props) => {
	const { id, completed, priority } = task;

	return (
		<div className='flex gap-4 border-b border-neutral-200 pb-4 sm:p-4'>
			<Completed task={task} />
			<div className='min-w-0'>
				<Title task={task} />
				<Description task={task} />
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
