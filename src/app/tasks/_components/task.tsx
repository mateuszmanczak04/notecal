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
	onMouseDown: (task: Task, e: React.MouseEvent<HTMLDivElement>) => void;
	onMouseEnterTop: (task: Task, e: React.MouseEvent<HTMLDivElement>) => void;
	onMouseEnterBottom: (task: Task, e: React.MouseEvent<HTMLDivElement>) => void;
	top: number;
};

const Task = ({ task, forPage = 'tasks', onMouseDown, onMouseEnterTop, onMouseEnterBottom, top }: Props) => {
	return (
		<>
			<div
				className={cn(
					'relative flex w-full gap-4 bg-white p-4 dark:bg-neutral-800',
					forPage === 'notes' && 'gap-2 p-2',
					top && 'absolute z-10  shadow-xl',
				)}
				style={{ top }}
				onMouseDown={e => onMouseDown(task, e)}>
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
				<div
					className='absolute left-0 top-0 h-1/2 w-full bg-red-500/10'
					onMouseEnter={e => onMouseEnterTop(task, e)}
				/>
				<div
					className='absolute left-0 top-1/2 h-1/2 w-full bg-blue-500/10'
					onMouseEnter={e => onMouseEnterBottom(task, e)}
				/>
			</div>
		</>
	);
};

export default Task;
