'use client';

import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import useCourses from '../../courses/_hooks/use-courses';
import useTasks from '../_hooks/use-tasks';
import CreateTask from './create-task';
import Task from './task';

const TasksPage = () => {
	const { tasks, isPending, error } = useTasks();
	const { isPending: isPendingCourses } = useCourses();

	return (
		<div className='mx-auto max-w-[800px] space-y-8'>
			{error && <ErrorMessage>{error.message}</ErrorMessage>}

			<CreateTask />

			{(isPending || isPendingCourses) && (
				<div className='grid place-content-center'>
					<LoadingSpinner />
				</div>
			)}

			{/* No tasks */}
			{(!tasks || tasks.length === 0) &&
				!(isPending || isPendingCourses) && (
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
