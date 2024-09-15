'use client';

import DatePicker from '@/components/common/date-picker';
import { Note } from '@prisma/client';
import useNotes from '../_hooks/use-notes';

type Props = {
	note: Note;
};

const EndTime = ({ note }: Props) => {
	const { update: updateNote } = useNotes();

	const onChange = (newEndTime: Date | null) => {
		if (!newEndTime) return;

		// TODO: display a message telling you can't set it like that
		if (newEndTime < note.startTime) return;

		updateNote({ id: note.id, endTime: newEndTime });
	};

	return (
		<DatePicker
			className='w-56'
			date={note.endTime}
			onSelect={newDate => onChange(newDate)}
		/>
	);
};

export default EndTime;
