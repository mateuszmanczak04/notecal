'use client';

import DatePicker from '@/components/common/date-picker';
import { Note } from '@prisma/client';

type Props = {
	note: Note;
};

const EndTime = ({ note }: Props) => {
	const updateNote = (input: any) => {};

	const onChange = (newEndTime: Date | null) => {
		if (!newEndTime) return;

		// TODO: display a message telling you can't set it like that
		if (newEndTime < note.startTime) return;

		updateNote({ id: note.id, endTime: newEndTime });
	};

	return <DatePicker className='w-56' date={note.endTime} onSelect={newDate => onChange(newDate)} />;
};

export default EndTime;
