'use client';

import { useAppContext } from '@/app/_components/app-context';
import DatePicker from '@/components/date-picker';
import { cn } from '@/utils/cn';
import { Note } from '@prisma/client';
import { useTransition } from 'react';

type Props = {
	note: Note;
};

const EndTime = ({ note }: Props) => {
	const { updateNote } = useAppContext();
	const [isPending, startTransition] = useTransition();

	const onChange = (newEndTime: Date | null) => {
		if (!newEndTime) return;

		// TODO: display a message telling you can't set it like that
		if (newEndTime < note.startTime) return;

		startTransition(async () => {
			await updateNote({ id: note.id, endTime: newEndTime });
		});
	};

	return (
		<article>
			<p className='text-xl font-semibold'>End time:</p>
			<DatePicker
				className={cn('mt-2 w-56', isPending && 'opacity-50')}
				date={note.endTime}
				onSelect={onChange}
			/>
		</article>
	);
};

export default EndTime;
