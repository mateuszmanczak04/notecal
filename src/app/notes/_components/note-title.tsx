'use client';

import { useNoteContext } from '@/app/notes/_components/note-context';

const NoteTitle = () => {
	const { course, currentNote } = useNoteContext();

	return (
		<div>
			<h1 className='text-xl font-semibold'>
				{course.name}{' '}
				<span className='text-sm opacity-75'>
					({currentNote.startTime.toDateString()})
				</span>
			</h1>
		</div>
	);
};

export default NoteTitle;
