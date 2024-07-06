'use client';

import { useNoteContext } from '@/app/notes/_context/note-context';
import NoteTask from '@/app/notes/_components/note-task';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NoteTasks = () => {
	const { tasks, course } = useNoteContext();

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Tasks:</p>
			{tasks?.map(task => <NoteTask key={task.id} task={task} />)}
			<Button asChild size='sm'>
				<Link href={`/tasks/create?courseId=${course.id}`}>
					+ Create a new task
				</Link>
			</Button>
		</div>
	);
};

export default NoteTasks;
