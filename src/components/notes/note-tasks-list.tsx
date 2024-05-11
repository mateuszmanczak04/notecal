'use client';

import NoteTask from '@/components/notes/note-task';
import { Button } from '@/components/ui/button';
import { FC } from 'react';

interface NoteTasksListProps {
	courseId: string;
}

const TASKS = [
	{
		id: 1,
		title: 'Task 1',
		description: 'Description 1',
		course: 'Course 1',
		priority: 1,
		date: '12.12.2024',
	},
	{
		id: 2,
		title: 'Task 2',
		description: 'Description 2',
		course: 'Course 2',
		priority: 2,
		date: '13.12.2024',
	},
	{
		id: 3,
		title: 'Task 3',
		description: 'Description 3',
		course: 'Course 3',
		priority: 3,
		date: '14.12.2024',
	},
	{
		id: 4,
		title: 'Task 4',
		description: 'Description 4',
		course: 'Course 4',
		priority: 4,
		date: '15.12.2024',
	},
	{
		id: 5,
		title: 'Task 5',
		description: 'Description 5',
		course: 'Course 5',
		priority: 5,
		date: '16.12.2024',
	},
];

const NoteTasksList: FC<NoteTasksListProps> = ({ courseId }) => {
	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Tasks:</p>
			{TASKS.map(task => (
				<NoteTask key={task.id} {...task} />
			))}
			<Button>+ Create a new task</Button>
		</div>
	);
};

export default NoteTasksList;
