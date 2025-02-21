'use client';

import { type Task as TaskItem } from '@prisma/client';
import { GripVertical } from 'lucide-react';
import { Reorder, useDragControls } from 'motion/react';
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
	const dragControls = useDragControls();

	return (
		<Reorder.Item
			dragControls={dragControls}
			dragListener={false}
			value={task}
			whileDrag={{ userSelect: 'none', pointerEvents: 'none' }}
			className='mt-4 flex w-full cursor-grab gap-4 rounded-lg border border-neutral-200  bg-white dark:border-neutral-700 dark:bg-neutral-800'>
			<div
				className='grid h-auto w-6 cursor-move place-content-center rounded-l-lg bg-neutral-100 dark:bg-neutral-700'
				onPointerDown={e => dragControls.start(e)}>
				<GripVertical className='size-4' />
			</div>
			<TaskCompleted task={task} />
			<div className='flex min-w-0 flex-1 select-none flex-col p-4'>
				<TaskTitle task={task} />
				<TaskDescription task={task} />

				<div className='flex flex-wrap gap-4'>
					<TaskCourse task={task} />
					<TaskDueDate task={task} />
					<TaskPriority task={task} />
				</div>
			</div>
		</Reorder.Item>
	);
};

export default TaskItem;
