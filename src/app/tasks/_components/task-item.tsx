import { type Task as TaskItem } from '@prisma/client';
import { Reorder } from 'motion/react';
import TaskCompleted from './task-completed';
import TaskCourse from './task-course';
import TaskDescription from './task-description';
import TaskDueDate from './task-due-date';
import TaskPriority from './task-priority';
import TaskTitle from './task-title';

type T_Props = {
	task: TaskItem;
};

/** Single task for /tasks page */
const TaskItem = ({ task }: T_Props) => {
	return (
		<Reorder.Item
			value={task}
			whileDrag={{ userSelect: 'none', pointerEvents: 'none' }}
			className='flex w-full cursor-grab gap-4 border-b border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-800'>
			<TaskCompleted task={task} />
			<div className='flex min-w-0 flex-1 select-none flex-col'>
				<TaskTitle task={task} forPage='tasks' />
				<TaskDescription task={task} forPage='tasks' />

				<div className='flex flex-wrap gap-4'>
					<TaskCourse task={task} forPage='tasks' />
					<TaskDueDate task={task} forPage='tasks' />
					<TaskPriority task={task} forPage='tasks' />
				</div>
			</div>
		</Reorder.Item>
	);
};

export default TaskItem;
