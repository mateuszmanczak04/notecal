'use client';

import { useNoteContext } from '@/components/notes/note-context';

const NoteContent = () => {
	const { note } = useNoteContext();

	return (
		<div className='mt-2 flex flex-col gap-4 rounded-md bg-gray-100 p-4'>
			{note.content}
		</div>
	);
};

export default NoteContent;
