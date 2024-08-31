'use client';

import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import useCourses from '../courses/_hooks/use-courses';
import CreateTask from './_components/create-task';
import Task from './_components/task';
import useTasks from './_hooks/use-tasks';

const TasksPage = () => {
	const { tasks, isPending, error } = useTasks();
	const { isPending: isPendingCourses } = useCourses();

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

			{/* No tasks */}
			{(!tasks || tasks.length === 0) && (
				<p className='text-lg text-neutral-500'>
					You don&apos;t have any tasks yet.
				</p>
			)}

			<CreateTask />

			{/* At least 1 task */}
			{tasks &&
				tasks.length > 0 &&
				tasks.map(task => <Task key={task.id} task={task} />)}
		</div>
	);
};

export default TasksPage;
