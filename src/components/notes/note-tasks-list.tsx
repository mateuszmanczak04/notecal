'use client';

import { useNoteContext } from '@/components/notes/note-context';
import NoteTask from '@/components/notes/note-task';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NoteTasksList = () => {
	const { tasks, course } = useNoteContext();

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Tasks:</p>
			{tasks?.map(task => <NoteTask key={task.id} task={task} />)}
			{/* todo - redirect to create new task page with specifiec course id */}

			<Button asChild>
				<Link href={`/tasks/create?courseId=${course.id}`}>
					+ Create a new task
				</Link>
			</Button>
		</div>
	);
};

export default NoteTasksList;
