'use client';

import ErrorMessage from '@/components/error-message';
import LoadingSpinner from '@/components/loading-spinner';
import { useTasks } from '@/hooks/use-tasks';
import { useTasksDrag } from '../hooks/use-tasks-drag';
import Task from './task';
import TaskWithoutDragging from './task-without-dragging';

/**
 * List of all user's tasks.
 */
const Tasks = () => {
	const { data: tasks, error, isPending } = useTasks();
	const { containerRef, handleMouseDown, movedTask, movedTaskTop, movedTaskIndex, setMovedTaskIndex } = useTasksDrag({
		tasks: tasks || [],
	});

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!tasks || tasks.length === 0) {
		return <p className='text-center text-lg text-neutral-500 sm:ml-8'>You don&apos;t have any tasks yet.</p>;
	}

	return (
		<div className='relative' ref={containerRef}>
			{movedTaskIndex === null &&
				tasks.map((task, index) => (
					<Task
						key={task.id}
						task={task}
						movedTask={movedTask}
						index={index}
						setMovedTaskIndex={setMovedTaskIndex}
						onMouseDown={handleMouseDown}
						top={task.id === movedTask?.id ? movedTaskTop : 0}
					/>
				))}
			{movedTaskIndex !== null && (
				<>
					{tasks.slice(0, movedTaskIndex).map((task, index) => (
						<Task
							key={task.id}
							task={task}
							movedTask={movedTask}
							index={index}
							setMovedTaskIndex={setMovedTaskIndex}
							onMouseDown={handleMouseDown}
							top={task.id === movedTask?.id ? movedTaskTop : 0}
						/>
					))}
					{movedTask && <TaskWithoutDragging task={movedTask} forPage='tasks' />}
					{tasks.slice(movedTaskIndex).map((task, index) => (
						<Task
							key={task.id}
							task={task}
							movedTask={movedTask}
							index={index + movedTaskIndex}
							setMovedTaskIndex={setMovedTaskIndex}
							onMouseDown={handleMouseDown}
							top={task.id === movedTask?.id ? movedTaskTop : 0}
						/>
					))}
				</>
			)}
		</div>
	);
};

export default Tasks;
