'use client';

import DatePicker from '@/components/common/date-picker';
import { Note } from '@prisma/client';
import useNotes from '../_hooks/use-notes';

type Props = {
	note: Note;
};

const StartTime = ({ note }: Props) => {
	const { update: updateNote } = useNotes();

	const onChange = (newStartTime: Date | null) => {
		if (!newStartTime) return;

		// TODO: display a message telling you can't set it like that
		if (newStartTime > note.endTime) return;

		updateNote({ id: note.id, startTime: newStartTime });
	};

	return <DatePicker className='w-56' date={note.startTime} onSelect={newDate => onChange(newDate)} />;
};

export default StartTime;
