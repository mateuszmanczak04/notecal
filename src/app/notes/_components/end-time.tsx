'use client';

import { useNoteContext } from '@/app/notes/_context/note-context';
import DatePicker from '@/components/common/date-picker';
import useNotes from '../_hooks/use-notes';

const EndTime = () => {
	const { currentNote } = useNoteContext();
	const { update: updateNote } = useNotes();

	const onChange = (newEndTime: Date | null) => {
		if (!newEndTime) return;

		// TODO: display a message telling you can't set it like that
		if (newEndTime < currentNote.startTime) return;

		updateNote({ id: currentNote.id, endTime: newEndTime });
	};

	return (
		<DatePicker
			className='w-56'
			date={currentNote.endTime}
			onSelect={newDate => onChange(newDate)}
		/>
	);
};

export default EndTime;
