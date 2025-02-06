import { cn } from '@/utils/cn';
import { Task as T_Task } from '@prisma/client';
import TaskCompleted from './task-completed';
import TaskCourse from './task-course';
import TaskDescription from './task-description';
import TaskDueDate from './task-due-date';
import TaskPriority from './task-priority';
import TaskTitle from './task-title';

type T_Props = {
	task: T_Task;
	forPage?: 'tasks' | 'notes';
};

const TaskWithoutDragging = ({ task, forPage = 'tasks' }: T_Props) => {
	return (
		<div
			className={cn(
				'relative flex w-full gap-4 bg-neutral-100 p-4 dark:bg-neutral-700 ',
				forPage === 'notes' && 'gap-2 p-2',
			)}>
			<TaskCompleted task={task} />
			<div className='flex min-w-0 flex-1 flex-col '>
				<TaskTitle task={task} forPage={forPage} />
				<TaskDescription task={task} />
				<div
					className={cn(
						forPage === 'tasks' && 'flex flex-wrap gap-4',
						forPage === 'notes' && 'flex flex-col gap-y-2 ',
					)}>
					<TaskCourse task={task} />
					<TaskDueDate task={task} forPage={forPage} />
					<TaskPriority task={task} forPage={forPage} />
				</div>
			</div>
		</div>
	);
};

export default TaskWithoutDragging;
