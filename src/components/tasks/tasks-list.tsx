'use client';

import TaskItem from '@/components/tasks/task-item';
import useTasks from '@/hooks/use-tasks';
import { FC } from 'react';
import LoadingSpinner from '@/components/loading-spinner';

interface TasksListProps {}

const TasksList: FC<TasksListProps> = ({}) => {
	const { tasks, isPending, error } = useTasks();

	if (isPending) return <LoadingSpinner />;

	if (error) return <p className='text-red-500'>{error.message}</p>;

	if (!tasks || tasks.length === 0) {
		return (
			<p className='text-lg text-gray-500'>
				You don&apos;t have any tasks yet.
			</p>
		);
	}

	return tasks?.map(task => <TaskItem key={task.id} task={task} />);
};

export default TasksList;
