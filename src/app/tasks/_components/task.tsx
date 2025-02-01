import { cn } from '@/utils/cn';
import { type Task } from '@prisma/client';
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
	onDragEnter: (task: Task, e: React.DragEvent<HTMLDivElement>) => void;
	onDragStart: (task: Task, e: React.DragEvent<HTMLDivElement>) => void;
	onDrop: (task: Task, e: React.DragEvent<HTMLDivElement>) => void;
	onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
	isBeingDropped?: boolean;
};

const Task = ({ task, forPage = 'tasks', onDragEnter, onDrop, onDragStart, isBeingDropped, onDragOver }: Props) => {
	return (
		<>
			<div
				className={cn('flex gap-4 p-4', forPage === 'notes' && 'w-full gap-2 p-2')}
				draggable
				onDragEnter={e => onDragEnter(task, e)}
				onDragStart={e => onDragStart(task, e)}
				onDragOver={e => onDragOver(e)}
				onDrop={e => onDrop(task, e)}>
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
			{isBeingDropped && <div className={cn('h-1 w-full rounded-md bg-neutral-200 dark:bg-neutral-600')}></div>}
		</>
	);
};

export default Task;
