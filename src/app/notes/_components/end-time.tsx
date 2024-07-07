'use client';

import updateNote from '@/app/notes/_actions/update-note';
import { useNoteContext } from '@/app/notes/_context/note-context';
import { useTransition } from 'react';
import DatePicker from '@/components/common/date-picker';
import LocalNotes from '@/lib/local-notes';

const EndTime = () => {
	const { currentNote } = useNoteContext();
	const [isPending, startTransition] = useTransition();

	const onChange = (newEndTime: Date | null) => {
		if (!newEndTime) return;

		// TODO: display a message telling you can't set it like that
		if (newEndTime < currentNote.startTime) return;

		startTransition(async () => {
			// TODO: optimistic updates
			updateNote({ id: currentNote.id, endTime: newEndTime });
			await LocalNotes.update(currentNote.id, { endTime: newEndTime });
		});
	};

	return (
		<DatePicker
			className='w-56'
			isPending={isPending}
			date={currentNote.endTime}
			onSelect={newDate => onChange(newDate)}
		/>
	);
};

export default EndTime;
