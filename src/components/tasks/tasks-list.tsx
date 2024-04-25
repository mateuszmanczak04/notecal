'use client';

import TaskItem from '@/components/tasks/task-item';
import useTasks from '@/hooks/use-tasks';
import { FC, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

interface TasksListProps {}

const TasksList: FC<TasksListProps> = ({}) => {
	const { data, isLoading, isError, error, isFetching } = useTasks();
	const tasks = data?.tasks;

	if (isLoading || isFetching) {
		return <ClipLoader />;
	}

	if (isError) {
		return <p>Error: {error.message}</p>;
	}

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
