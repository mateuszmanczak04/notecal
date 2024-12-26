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
};

const Task = ({ task, forPage = 'tasks' }: Props) => {
	return (
		<div className={cn('flex gap-4 p-4', forPage === 'notes' && 'gap-2  p-2')}>
			<Completed task={task} forPage={forPage} />
			<div className='min-w-0 flex-1'>
				<Title task={task} forPage={forPage} />
				<Description task={task} forPage={forPage} />

				<div
					className={cn(
						forPage === 'tasks' && 'flex flex-wrap gap-4',
						forPage === 'notes' && 'grid w-full gap-2 ',
					)}>
					<Course task={task} forPage={forPage} />
					<DueDate task={task} forPage={forPage} />
					<Priority task={task} forPage={forPage} />
				</div>
			</div>
		</div>
	);
};

export default Task;
