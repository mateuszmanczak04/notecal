'use client';

import TaskItem from '@/components/tasks/task-item';
import { Task } from '@/types';
import { FC, useState } from 'react';

interface TasksListProps {
	tasks: Task[];
}

const TasksList: FC<TasksListProps> = ({ tasks: initialTasks }) => {
	const [tasks, setTasks] = useState(initialTasks);

	return (
		<>
			{tasks.map(task => (
				<TaskItem key={task.id} {...task} />
			))}
		</>
	);
};

export default TasksList;
