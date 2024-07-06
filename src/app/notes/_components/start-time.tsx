'use client';

import updateNote from '@/app/notes/_actions/update-note';
import { useNoteContext } from '@/app/notes/_context/note-context';
import updateNoteStartTimeLocal from '@/lib/update-note-start-time-local';
import { useTransition } from 'react';
import DatePicker from '@/components/common/date-picker';

const StartTime = () => {
	const { currentNote } = useNoteContext();
	const [isPending, startTransition] = useTransition();

	const onChange = (newStartTime: Date | null) => {
		if (!newStartTime) return;

		// todo - display a message telling you can't set it like that
		// and set the input state to state before changes
		if (newStartTime > currentNote.endTime) return;

		startTransition(() => {
			updateNote({ id: currentNote.id, startTime: newStartTime });
			updateNoteStartTimeLocal(currentNote.id, newStartTime);
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
