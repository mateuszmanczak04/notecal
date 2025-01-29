'use client';

import DatePicker from '@/components/date-picker';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { toUTC } from '@/utils/timezone';
import { Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateNote from '../_actions/update-note';

type Props = {
	note: Note;
};

const StartTime = ({ note }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: updateNote,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	const onChange = (newStartTime: Date | null) => {
		if (note.endTime && newStartTime && newStartTime > note.endTime) return;

		mutate({ id: note.id, startTime: newStartTime ? toUTC(newStartTime) : null });
	};

	return (
		<article>
			<p className='text-xl font-semibold'>Note&apos;s start time</p>
			<DatePicker
				className={cn('mt-2 w-56', isPending && 'pointer-events-none opacity-50')}
				date={note.startTime}
				onSelect={onChange}
			/>
		</article>
	);
};

export default StartTime;
