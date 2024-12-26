'use client';

import { useAppContext } from '@/app/_components/app-context';
import Task from './task';

const Tasks = () => {
	const { tasks } = useAppContext();

	if (!tasks || tasks.length === 0) {
		return <p className='text-center text-lg text-neutral-500 sm:ml-8'>You don&apos;t have any tasks yet.</p>;
	}

	return (
		<div className='space-y-4'>
			{tasks.map(task => (
				<Task key={task.id} task={task} />
			))}
		</div>
	);
};

export default Tasks;
