'use client';

import { useNoteContext } from '@/components/notes/note-context';

const NoteContent = () => {
	const { currentNote } = useNoteContext();

	return (
		<div className='mt-2 flex flex-col gap-4 rounded-md bg-gray-100 p-4'>
			{currentNote.content}
		</div>
	);
};

export default NoteContent;
