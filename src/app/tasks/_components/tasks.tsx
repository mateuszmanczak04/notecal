'use client';

import { Task as T_Task } from '@prisma/client';
import Task from './task';

type Props = {
	tasks: T_Task[];
};

const Tasks = ({ tasks }: Props) => {
	if (!tasks || tasks.length === 0) {
		return <p className='text-center text-lg text-neutral-500 sm:ml-8'>You don&apos;t have any tasks yet.</p>;
	}

	return (
		<div>
			{tasks.map(task => (
				<Task key={task.id} task={task} />
			))}
		</div>
	);
};

export default Tasks;
