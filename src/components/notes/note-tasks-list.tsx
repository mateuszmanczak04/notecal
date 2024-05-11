'use client';

import { useNoteContext } from '@/components/notes/note-context';
import NoteTask from '@/components/notes/note-task';
import { Button } from '@/components/ui/button';

const NoteTasksList = () => {
	const { tasks } = useNoteContext();

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Tasks:</p>
			{tasks?.map(task => (
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
