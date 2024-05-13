'use client';

import { useNoteContext } from '@/components/notes/note-context';
import NoteTask from '@/components/notes/note-task';
import { Button } from '@/components/ui/button';

const NoteTasksList = () => {
	const { tasks, tasksError, tasksIsLoading } = useNoteContext();

	if (tasksIsLoading) {
		return <p className='animate-bounce'>Loading...</p>;
	}

	if (tasksError) {
		return (
			<p className='rounded-md bg-red-100 p-2 text-red-800'>{tasksError}</p>
		);
	}

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Tasks:</p>
			{tasks?.map(task => <NoteTask key={task.id} task={task} />)}
			{/* todo - redirect to create new task page with specifiec course id */}
			<Button>+ Create a new task</Button>
		</div>
	);
};

export default NoteTasksList;