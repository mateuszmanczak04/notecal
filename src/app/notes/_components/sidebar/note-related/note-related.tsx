'use client';

import { Note as T_Note } from '@prisma/client';
import GoToCalendarNote from './go-to-calendar-note';
import NoteEndTime from './note-end-time';
import NoteStartTime from './note-start-time';

type T_Props = {
	note: T_Note;
};

const NoteRelated = ({ note }: T_Props) => {
	return (
		<div className='flex flex-col gap-y-4 border-b border-neutral-200 p-6 dark:border-neutral-700'>
			<NoteStartTime note={note} />
			<NoteEndTime note={note} />
			{note.startTime && note.endTime && <GoToCalendarNote note={note} />}
		</div>
	);
};

export default NoteRelated;
