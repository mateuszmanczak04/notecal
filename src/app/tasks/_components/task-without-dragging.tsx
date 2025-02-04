import { cn } from '@/utils/cn';
import { Task as T_Task } from '@prisma/client';
import Completed from './completed';
import Course from './course';
import Description from './description';
import DueDate from './due-date';
import Priority from './priority';
import Title from './title';

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
			<Completed task={task} forPage={forPage} />
			<div className='flex min-w-0 flex-1 flex-col '>
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
		</div>
	);
};

export default TaskWithoutDragging;
