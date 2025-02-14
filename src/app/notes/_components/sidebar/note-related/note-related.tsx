'use client';

import { useNoteContext } from '@/app/notes/_content/note-context';
import GoToCalendarNote from './go-to-calendar-note';
import NoteEndTime from './note-end-time';
import NoteStartTime from './note-start-time';

const NoteRelated = () => {
	const { currentNote } = useNoteContext();

	if (!currentNote) return null;

	return (
		<div className='flex flex-col gap-y-4 border-b border-neutral-200 p-6 dark:border-neutral-700'>
			<NoteStartTime note={currentNote} />
			<NoteEndTime note={currentNote} />
			{currentNote.startTime && currentNote.endTime && <GoToCalendarNote note={currentNote} />}
		</div>
	);
};

export default NoteRelated;
