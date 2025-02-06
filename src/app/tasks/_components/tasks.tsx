'use client';

import { Button } from '@/components/button';
import ErrorMessage from '@/components/error-message';
import LoadingSpinner from '@/components/loading-spinner';
import { Reorder } from 'motion/react';
import { useTasksFunctionality } from '../_hooks/use-tasks-functionality';
import Task from './task';

/**
 * List of all user's tasks.
 */
const Tasks = () => {
	const { handleReorder, error, handleSaveNewOrder, hasChangedOrder, isPending, tasks } = useTasksFunctionality({});

	if (isPending) return <LoadingSpinner />;

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
					<Task key={task.id} task={task} />
				))}
			</Reorder.Group>
		</div>
	);
};

export default Tasks;
