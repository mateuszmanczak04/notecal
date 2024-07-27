'use client';

import { useNoteContext } from '@/app/notes/_context/note-context';
import DatePicker from '@/components/common/date-picker';
import useNotes from '../_hooks/use-notes';

const StartTime = () => {
	const { currentNote } = useNoteContext();
	const { update: updateNote } = useNotes();

	const onChange = (newStartTime: Date | null) => {
		if (!newStartTime) return;

		// TODO: display a message telling you can't set it like that
		if (newStartTime > currentNote.endTime) return;

		updateNote({ id: currentNote.id, startTime: newStartTime });
	};

	return (
		<DatePicker
			className='w-56'
			date={currentNote.startTime}
			onSelect={newDate => onChange(newDate)}
		/>
	);
};

export default StartTime;
