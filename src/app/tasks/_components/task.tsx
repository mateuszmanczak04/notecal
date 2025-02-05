import { cn } from '@/utils/cn';
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
	/** Specify use case for this component. It can be user either big one in /tasks page or as a small task in /notes/[id] page. */
	forPage?: 'tasks' | 'notes';
};

const Task = ({ task, forPage = 'tasks' }: Props) => {
	return (
		<Reorder.Item
			value={task}
			className={cn(
				'relative flex w-full cursor-move gap-4 border-b border-neutral-700 bg-white p-4 dark:bg-neutral-800',
				forPage === 'notes' && 'gap-2 p-2',
			)}>
			<Completed task={task} forPage={forPage} />
			<div className='flex min-w-0 flex-1 select-none flex-col'>
				<Title task={task} forPage={forPage} />
				<Description task={task} forPage={forPage} />

				<div
					className={cn(
						forPage === 'tasks' && 'flex flex-wrap gap-4',
						forPage === 'notes' && 'flex flex-col gap-y-2 ',
					)}>
					<Course task={task} forPage={forPage} />
					<DueDate task={task} forPage={forPage} />
					<Priority task={task} forPage={forPage} />
				</div>
			</div>
		</Reorder.Item>
	);
};

export default Task;
