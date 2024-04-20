'use client';

import CreateTaskButton from '@/components/tasks/create-task-button';
import SortTasks from '@/components/tasks/sort-tasks';
import TaskItem from '@/components/tasks/task-item';
import TaskItemCompact from '@/components/tasks/task-item-compact';
import TasksViewMode from '@/components/tasks/tasks-view-mode';
import useTasksContext from '@/hooks/useTasksContext';
import { FC, useState } from 'react';
import { ClipLoader } from 'react-spinners';

interface TasksListProps {}

const TasksList: FC<TasksListProps> = ({}) => {
	const { tasks, isLoading } = useTasksContext();

	const [viewMode, setViewMode] = useState<'default' | 'compact'>('default');

	if (isLoading) {
		return <ClipLoader />;
	}

	return (
		<>
			<div className='flex flex-col items-center gap-2 sm:flex-row'>
				<SortTasks />
				<CreateTaskButton />
				<TasksViewMode setViewMode={setViewMode} viewMode={viewMode} />
			</div>
			{isLoading && <p>Loading...</p>}
			{viewMode === 'default' &&
				tasks?.map(task => <TaskItem key={task.id} courses={[]} task={task} />)}
			{viewMode === 'compact' &&
				tasks?.map(task => (
					<TaskItemCompact key={task.id} courses={[]} task={task} />
				))}
		</>
	);
};

export default TasksList;
