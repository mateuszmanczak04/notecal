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
		<fieldset className='flex flex-col gap-y-4 rounded-xl border border-neutral-200 p-4 dark:border-neutral-700'>
			<legend className='px-2'>Note related</legend>
			<NoteStartTime note={note} />
			<NoteEndTime note={note} />
			{note.startTime && note.endTime && <GoToCalendarNote note={note} />}
		</fieldset>
	);
};

export default NoteRelated;
