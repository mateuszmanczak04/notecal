'use client';

import ErrorMessage from '@/components/error-message';
import LoadingSpinner from '@/components/loading-spinner';
import { useQuery } from '@tanstack/react-query';
import getTasks from '../_actions/get-tasks';
import Task from './task';

/**
 * List of all user's tasks.
 */
const Tasks = () => {
	const {
		data: tasks,
		error,
		isPending,
	} = useQuery({
		queryKey: ['tasks'],
		queryFn: getTasks,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

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
