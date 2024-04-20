'use client';

import CreateTaskButton from '@/components/tasks/create-task-button';
import SortTasks from '@/components/tasks/sort-tasks';
import TaskItem from '@/components/tasks/task-item';
import TaskItemCompact from '@/components/tasks/task-item-compact';
import TasksViewMode from '@/components/tasks/tasks-view-mode';
import { Task } from '@/types';
import { Course } from '@prisma/client';
import { FC, useState } from 'react';

interface TasksListProps {
	tasks: Task[];
	courses: Course[];
}

const TasksList: FC<TasksListProps> = ({ tasks: initialTasks, courses }) => {
	const [tasks, setTasks] = useState(initialTasks);
	const [viewMode, setViewMode] = useState<'default' | 'compact'>('default');

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
			<div className='flex flex-col items-center gap-2 sm:flex-row'>
				<SortTasks onChange={handleSort} />
				<CreateTaskButton />
				<TasksViewMode setViewMode={setViewMode} viewMode={viewMode} />
			</div>
			{viewMode === 'default' &&
				tasks.map(task => (
					<TaskItem key={task.id} courses={courses} task={task} />
				))}
			{viewMode === 'compact' &&
				tasks.map(task => (
					<TaskItemCompact key={task.id} courses={courses} task={task} />
				))}
		</>
	);
};

export default TasksList;
