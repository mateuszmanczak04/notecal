import { T_Task } from '../../../types';
import TaskCompleted from './task-completed';
import TaskCourse from './task-course';
import TaskDescription from './task-description';
import TaskDueDate from './task-due-date';
import TaskPriority from './task-priority';
import TaskTitle from './task-title';

type T_Props = {
	task: T_Task;
};

/** Single task for /tasks page */
const TaskItem = ({ task }: T_Props) => {
	return (
		<div className='mt-4 flex w-full gap-4 rounded-lg border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800'>
			{/* <div className='grid h-auto w-6 cursor-move place-content-center rounded-l-lg bg-neutral-100 dark:bg-neutral-700'>
				<GripVertical className='size-4' />
			</div> */}

			<div className='flex min-w-0 flex-1 select-none flex-col p-4'>
				<div className='flex items-start gap-4'>
					<TaskCompleted task={task} />
					<div className='flex-1'>
						<TaskTitle task={task} />
						<TaskDescription task={task} />
					</div>
				</div>

				<div className='flex flex-wrap gap-2'>
					<TaskCourse task={task} />
					<TaskPriority task={task} />
					<TaskDueDate task={task} />
				</div>
			</div>
		</div>
	);
};

export default TaskItem;
