'use client';

import updateNote from '@/app/notes/_actions/update-note';
import { useNoteContext } from '@/app/notes/_context/note-context';
import { useTransition } from 'react';
import DatePicker from '@/components/common/date-picker';
import LocalNotes from '@/lib/local-notes';

const StartTime = () => {
	const { currentNote } = useNoteContext();
	const [isPending, startTransition] = useTransition();

	const onChange = (newStartTime: Date | null) => {
		if (!newStartTime) return;

		// TODO: display a message telling you can't set it like that
		if (newStartTime > currentNote.endTime) return;

		startTransition(async () => {
			// TODO: optimistic updates
			updateNote({ id: currentNote.id, startTime: newStartTime });
			await LocalNotes.update(currentNote.id, { startTime: newStartTime });
		});
	};

	return (
		<DatePicker
			className='w-56'
			isPending={isPending}
			date={currentNote.startTime}
			onSelect={newDate => onChange(newDate)}
		/>
	);
};

export default StartTime;
