'use client';

import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import { Reorder } from 'motion/react';
import { useTasksFunctionality } from '../_hooks/use-tasks-functionality';
import TaskItem from './task-item';

/** List of tasks for /tasks page */
const TasksList = () => {
	const { handleReorder, error, handleSaveNewOrder, hasChangedOrder, isPending, tasks } = useTasksFunctionality({});

	if (isPending)
		return (
			<div>
				<div className='mt-4 h-8 w-full  animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-6 w-2/3 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-10 w-3/4 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-4 h-8 w-full animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-6 w-2/3 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-10 w-3/4 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-4 h-8 w-full animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-6 w-2/3 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
				<div className='mt-2 h-10 w-3/4 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-700'></div>
			</div>
		);

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!tasks || tasks.length === 0) {
		return <p className='text-center text-lg text-neutral-500 sm:ml-8'>You don&apos;t have any tasks yet.</p>;
	}

	return (
		<div className='relative'>
			{hasChangedOrder && (
				<Button className='w-full' onClick={handleSaveNewOrder}>
					Save new order
				</Button>
			)}

			<Reorder.Group values={tasks} onReorder={handleReorder}>
				{tasks.map(task => (
					<TaskItem key={task.id} task={task} />
				))}
			</Reorder.Group>
		</div>
	);
};

export default TasksList;
