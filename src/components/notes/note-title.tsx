'use client';

import { useNoteContext } from '@/components/notes/note-context';

const NoteTitle = () => {
	const { course, note } = useNoteContext();

	return (
		<div>
			<h1 className='text-xl font-semibold'>
				{course.name}{' '}
				<span className='text-sm opacity-75'>
					({note.startTime.toDateString()})
				</span>
			</h1>
		</div>
	);
};

export default NoteTitle;
