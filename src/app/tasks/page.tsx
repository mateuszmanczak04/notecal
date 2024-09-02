'use client';

import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import { useEffect } from 'react';
import useCourses from '../courses/_hooks/use-courses';
import CreateTask from './_components/create-task';
import Task from './_components/task';
import useTasks from './_hooks/use-tasks';
import useTasksHistory from './_hooks/use-tasks-history';

const TasksPage = () => {
	const { tasks, isPending, error } = useTasks();
	const { isPending: isPendingCourses } = useCourses();
	const { redo, undo } = useTasksHistory();

	// Listen for undo/redo keyboard shortcuts
	useEffect(() => {
		const listener = (e: KeyboardEvent) => {
			if (e.metaKey && e.key.toLocaleLowerCase() === 'z') {
				if (e.shiftKey) {
					redo();
				} else {
					undo();
				}
			}
		};

		window.addEventListener('keydown', listener);

		return () => {
			window.removeEventListener('keydown', listener);
		};
	}, [undo, redo]);

	if (isPending || isPendingCourses) {
		return (
			<div className='grid h-full w-full place-content-center '>
				<div className='flex flex-col gap-4'>
					<LoadingSpinner />
					<p className='animate-pulse'>
						Give us a second, we are loading your notes and courses
						😅
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='mx-auto max-w-[800px] space-y-8'>
			{error && <ErrorMessage>{error.message}</ErrorMessage>}

			<CreateTask />

			{/* No tasks */}
			{(!tasks || tasks.length === 0) && (
				<p className='text-center text-lg text-neutral-500 sm:ml-8'>
					You don&apos;t have any tasks yet.
				</p>
			)}

			{/* At least 1 task */}
			{tasks &&
				tasks.length > 0 &&
				tasks.map(task => <Task key={task.id} task={task} />)}
		</div>
	);
};

export default TasksPage;
