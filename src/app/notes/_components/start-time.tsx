'use client';

import { useAppContext } from '@/app/_components/app-context';
import DatePicker from '@/components/date-picker';
import { cn } from '@/utils/cn';
import { Note } from '@prisma/client';
import { useTransition } from 'react';

type Props = {
	note: Note;
};

const StartTime = ({ note }: Props) => {
	const { updateNote } = useAppContext();
	const [isPending, startTransition] = useTransition();

	const onChange = (newStartTime: Date | null) => {
		if (!newStartTime) return;

		// TODO: display a message telling you can't set it like that
		if (newStartTime > note.endTime) return;

		startTransition(async () => {
			await updateNote({ id: note.id, startTime: newStartTime });
		});
	};

	return (
		<article>
			<p className='text-xl font-semibold'>Start time:</p>
			<DatePicker
				className={cn('mt-2 w-56', isPending && 'opacity-50')}
				date={note.startTime}
				onSelect={onChange}
			/>
		</article>
	);
};

export default StartTime;
