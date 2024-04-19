'use client';

import CreateTaskButton from '@/components/tasks/create-task-button';
import SortTasks from '@/components/tasks/sort-tasks';
import TaskItem from '@/components/tasks/task-item';
import { Task } from '@/types';
import { FC, useState } from 'react';

interface TasksListProps {
	tasks: Task[];
}

const TasksList: FC<TasksListProps> = ({ tasks: initialTasks }) => {
	const [tasks, setTasks] = useState(initialTasks);

	const orderByCompleted = () => {
		setTasks(prev =>
			prev.toSorted((a, b) => {
				if (a.completed && !b.completed) {
					return -1;
				}
				if (!a.completed && b.completed) {
					return 1;
				}
				return 0;
			}),
		);
	};

	const orderByCreationDate = () => {
		setTasks(prev =>
			prev.toSorted((a, b) => {
				if (a.createdAt > b.createdAt) {
					return -1;
				}
				if (a.createdAt < b.createdAt) {
					return 1;
				}
				return 0;
			}),
		);
	};

	const orderByTitle = () => {
		setTasks(prev =>
			prev.toSorted((a, b) => {
				if (a.title > b.title) {
					return 1;
				}
				if (a.title < b.title) {
					return -1;
				}
				return 0;
			}),
		);
	};

	const handleSort = (option: string) => {
		switch (option) {
			case 'createdAt':
				orderByCreationDate();
				break;
			case 'title':
				orderByTitle();
				break;
			case 'completed':
				orderByCompleted();
				break;
			default:
				return;
		}
	};

	return (
		<>
			<div className='flex flex-col items-center gap-2 md:flex-row'>
				<SortTasks onChange={handleSort} />
				<CreateTaskButton />
			</div>
			{tasks.map(task => (
				<TaskItem key={task.id} {...task} />
			))}
		</>
	);
};

export default TasksList;
