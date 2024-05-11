'use client';

import NoteEndTime from '@/components/notes/note-end-time';
import NoteStartTime from '@/components/notes/note-start-time';

const NoteTime = () => {
	return (
		<div className='flex items-center gap-2'>
			<NoteStartTime />
			<NoteEndTime />
		</div>
	);
};

export default NoteTime;
