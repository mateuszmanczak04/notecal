'use client';

import NoteEndTime from '@/app/notes/_components/note-end-time';
import NoteStartTime from '@/app/notes/_components/note-start-time';

const NoteTime = () => {
	return (
		<div className='flex items-center gap-2'>
			<NoteStartTime />
			<NoteEndTime />
		</div>
	);
};

export default NoteTime;
