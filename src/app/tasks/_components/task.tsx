import { type Task } from '@prisma/client';
import { Reorder } from 'motion/react';
import Completed from './completed';
import Course from './course';
import Description from './description';
import DueDate from './due-date';
import Priority from './priority';
import Title from './title';

type Props = {
	task: Task;
};

/** Single task for /tasks page */
const Task = ({ task }: Props) => {
	return (
		<Reorder.Item
			value={task}
			whileDrag={{ userSelect: 'none', pointerEvents: 'none' }}
			className='flex w-full cursor-grab gap-4 border-b border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800'>
			<Completed task={task} forPage='tasks' />
			<div className='flex min-w-0 flex-1 select-none flex-col'>
				<Title task={task} forPage='tasks' />
				<Description task={task} forPage='tasks' />

				<div className='flex flex-wrap gap-4'>
					<Course task={task} forPage='tasks' />
					<DueDate task={task} forPage='tasks' />
					<Priority task={task} forPage='tasks' />
				</div>
			</div>
		</Reorder.Item>
	);
};

export default Task;
