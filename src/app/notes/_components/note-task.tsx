import Completed from '@/app/tasks/_components/completed';
import Course from '@/app/tasks/_components/course';
import Description from '@/app/tasks/_components/description';
import DueDate from '@/app/tasks/_components/due-date';
import Priority from '@/app/tasks/_components/priority';
import Title from '@/app/tasks/_components/title';
import { Task as T_Task, type Task as NoteTask } from '@prisma/client';
import { Reorder } from 'motion/react';

type Props = {
	task: T_Task;
};

/** Single task used in /notes page */
const NoteTask = ({ task }: Props) => {
	return (
		<Reorder.Item
			value={task}
			whileDrag={{ userSelect: 'none', pointerEvents: 'none' }}
			className='flex w-full cursor-grab gap-2 border-b border-neutral-200 bg-white p-2 p-4 dark:border-neutral-700 dark:bg-neutral-800'>
			<Completed task={task} forPage='notes' />
			<div className='flex min-w-0 flex-1 select-none flex-col'>
				<Title task={task} forPage='notes' />
				<Description task={task} forPage='notes' />

				<div className='flex flex-col gap-y-2 '>
					<Course task={task} forPage='notes' />
					<DueDate task={task} forPage='notes' />
					<Priority task={task} forPage='notes' />
				</div>
			</div>
		</Reorder.Item>
	);
};

export default NoteTask;
