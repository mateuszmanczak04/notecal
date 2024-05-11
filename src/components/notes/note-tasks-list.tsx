'use client';

import NoteTask from '@/components/notes/note-task';
import { Button } from '@/components/ui/button';
import useTasks from '@/hooks/use-tasks';
import { FC } from 'react';

interface NoteTasksListProps {
	courseId: string;
}

const NoteTasksList: FC<NoteTasksListProps> = ({ courseId }) => {
	const { data: tasksData } = useTasks();
	const courseTasks = tasksData?.tasks?.filter(
		task => task.courseId === courseId,
	);

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Tasks:</p>
			{courseTasks?.map(task => (
				<NoteTask
					key={task.id}
					date={task.dueDate}
					description={task.description}
					priority={task.priority}
					title={task.title}
				/>
			))}
			{/* todo - redirect to create new task page with specifiec course id */}
			<Button>+ Create a new task</Button>
		</div>
	);
};

export default NoteTasksList;
