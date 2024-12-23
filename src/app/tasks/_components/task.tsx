import { type Task } from '@prisma/client';
import Completed from './completed';
import Description from './description';
import DueDate from './due-date';
import Priority from './priority';
import Title from './title';

type Props = {
	task: Task;
};

const Task = ({ task }: Props) => {
	return (
		<div className='flex gap-4 border-b border-neutral-200 pb-4 sm:p-4'>
			<Completed task={task} />
			<div className='min-w-0'>
				<Title task={task} />
				<Description task={task} />

				<div className='mt-2 flex flex-wrap gap-2'>
					{/* TODO: first fix courses */}
					{/* <Course task={task} /> */}
					<DueDate task={task} />
					<Priority task={task} />
				</div>
			</div>
		</div>
	);
};

export default Task;
