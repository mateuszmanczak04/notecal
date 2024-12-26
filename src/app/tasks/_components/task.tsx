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
	if (forPage === 'notes') {
		// TODO: this variant
		return;
	}

	return (
		<div className='flex gap-4 rounded-xl p-4 '>
			<Completed task={task} forPage={forPage} />
			<div className='min-w-0'>
				<Title task={task} forPage={forPage} />
				<Description task={task} forPage={forPage} />

				<div className='flex flex-wrap gap-4 '>
					<Course task={task} forPage={forPage} />
					<DueDate task={task} forPage={forPage} />
					<Priority task={task} forPage={forPage} />
				</div>
			</div>
		</div>
	);
};

export default Task;
