'use client';

import useCourses from '@/app/courses/_hooks/use-courses';
import Task from '@/app/tasks/_components/task';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import { FC } from 'react';
import useTasks from '../_hooks/use-tasks';

interface TasksProps {}

const Tasks: FC<TasksProps> = ({}) => {
	const { tasks, isPending, error } = useTasks();
	const { isPending: isPendingCourses } = useCourses();

	if (isPending || isPendingCourses) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!tasks || tasks.length === 0) {
		return (
			<p className='text-lg text-neutral-500'>
				You don&apos;t have any tasks yet.
			</p>
		);
	}

	return tasks.map(task => <Task key={task.id} task={task} />);
};

export default Tasks;
