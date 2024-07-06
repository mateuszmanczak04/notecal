'use client';

import updateNote from '@/app/notes/_actions/update-note';
import { useNoteContext } from '@/app/notes/_context/note-context';
import updateNoteEndTimeLocal from '@/lib/update-note-end-time-local';
import { useTransition } from 'react';
import DatePicker from '@/components/common/date-picker';

const EndTime = () => {
	const { currentNote } = useNoteContext();
	const [isPending, startTransition] = useTransition();

	const onChange = (newEndTime: Date | null) => {
		console.log(newEndTime);

		if (!newEndTime) return;

		// todo - display a message telling you can't set it like that
		// and set the input state to state before changes
		if (newEndTime < currentNote.startTime) return;

		startTransition(() => {
			updateNote({ id: currentNote.id, endTime: newEndTime });
			updateNoteEndTimeLocal(currentNote.id, newEndTime);
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
