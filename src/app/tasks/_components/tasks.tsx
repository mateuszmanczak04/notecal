'use client';

import ErrorMessage from '@/components/error-message';
import LoadingSpinner from '@/components/loading-spinner';
import { useTasks } from '@/hooks/use-tasks';
import { useTasksDrag } from '../hooks/use-tasks-drag';
import Task from './task';

/**
 * List of all user's tasks.
 */
const Tasks = () => {
	const { data: tasks, error, isPending } = useTasks();
	const { handleDragEnter, handleDragOver, handleDragStart, handleDrop, droppedTaskId, draggedTask } = useTasksDrag({
		tasks: tasks || [],
	});

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!tasks || tasks.length === 0) {
		return <p className='text-center text-lg text-neutral-500 sm:ml-8'>You don&apos;t have any tasks yet.</p>;
	}

	return (
		<div className='space-y-4'>
			{tasks.map(task => (
				<Task
					draggedTask={draggedTask || undefined}
					isBeingDropped={task.id === droppedTaskId}
					key={task.id}
					task={task}
					onDragEnter={handleDragEnter}
					onDragStart={handleDragStart}
					onDragOver={handleDragOver}
					onDrop={handleDrop}
				/>
			))}
		</div>
	);
};

export default Tasks;
