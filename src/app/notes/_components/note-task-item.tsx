import TaskCompleted from '@/app/tasks/_components/task-completed';
import TaskCourse from '@/app/tasks/_components/task-course';
import TaskDescription from '@/app/tasks/_components/task-description';
import TaskDueDate from '@/app/tasks/_components/task-due-date';
import TaskPriority from '@/app/tasks/_components/task-priority';
import TaskTitle from '@/app/tasks/_components/task-title';
import { Task as T_Task, type Task as NoteTaskItem } from '@prisma/client';
import { Reorder } from 'motion/react';

type T_Props = {
	task: T_Task;
};

/** Single task used in /notes page */
const NoteTaskItem = ({ task }: T_Props) => {
	return (
		<Reorder.Item
			value={task}
			whileDrag={{ userSelect: 'none', pointerEvents: 'none' }}
			className='flex w-full cursor-grab gap-2 border-b border-neutral-200 bg-white p-2 p-4 dark:border-neutral-700 dark:bg-neutral-800'>
			<TaskCompleted task={task} forPage='notes' />
			<div className='flex min-w-0 flex-1 select-none flex-col'>
				<TaskTitle task={task} forPage='notes' />
				<TaskDescription task={task} forPage='notes' />

				<div className='flex flex-col gap-y-2 '>
					<TaskCourse task={task} forPage='notes' />
					<TaskDueDate task={task} forPage='notes' />
					<TaskPriority task={task} forPage='notes' />
				</div>
			</div>
		</Reorder.Item>
	);
};

export default NoteTaskItem;
