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
	draggedTask?: Task;
};

const Task = ({
	task,
	forPage = 'tasks',
	onDragEnter,
	onDrop,
	onDragStart,
	isBeingDropped,
	onDragOver,
	draggedTask,
}: Props) => {
	return (
		<>
			<div
				className={cn(
					'flex gap-4 bg-white p-4 transition-transform dark:bg-neutral-800',
					forPage === 'notes' && 'w-full gap-2 p-2',
				)}
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
			{isBeingDropped && draggedTask && (
				<div
					draggable
					onDragEnter={e => onDragEnter(task, e)}
					onDragStart={e => onDragStart(task, e)}
					onDragOver={e => onDragOver(e)}
					onDrop={e => onDrop(task, e)}
					className={cn(
						'flex gap-4 bg-neutral-100 p-4 dark:bg-neutral-700',
						forPage === 'notes' && 'w-full gap-2 p-2',
					)}>
					<Completed task={draggedTask} forPage={forPage} />
					<div className='flex min-w-0 flex-1 flex-col '>
						<Title task={draggedTask} forPage={forPage} />
						<Description task={draggedTask} forPage={forPage} />

						<div
							className={cn(
								forPage === 'tasks' && 'flex flex-wrap gap-4',
								forPage === 'notes' && 'flex flex-col gap-y-2 ',
							)}>
							<Course task={draggedTask} forPage={forPage} />
							<DueDate task={draggedTask} forPage={forPage} />
							<Priority task={draggedTask} forPage={forPage} />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Task;
