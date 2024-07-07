'use client';

import Task from '@/app/tasks/_components/task';
import useTasks from '../_hooks/use-tasks';
import { FC } from 'react';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';
import useCourses from '@/app/courses/_hooks/use-courses';

interface TasksProps {}

const Tasks: FC<TasksProps> = ({}) => {
	const { tasks, isPending, error } = useTasks();
	const { isPending: isPendingCourses } = useCourses();

	if (isPending || isPendingCourses) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!tasks || tasks.length === 0) {
		return (
			<p className='text-lg text-gray-500'>
				You don&apos;t have any tasks yet.
			</p>
		);
	}

	return tasks.map(task => <Task key={task.id} task={task} />);
};

export default Tasks;
