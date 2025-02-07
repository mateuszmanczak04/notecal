'use client';

import { useToast } from '@/components/toast/use-toast';
import { useDatePickerFunctionality } from '@/hooks/use-date-picker-functionality';
import { cn } from '@/utils/cn';
import { toUTC } from '@/utils/timezone';
import { Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateNote from '../../../_actions/update-note';

type Props = {
	note: Note;
};

/** Date picker to change note's endTime */
const NoteEndTime = ({ note }: Props) => {
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

	const onChange = (newEndTime: Date | null) => {
		if (note.startTime && newEndTime && newEndTime < note.startTime) return;

		mutate({ id: note.id, endTime: newEndTime ? toUTC(newEndTime) : null });
	};

	const { day, handleKeyDown, hour, menuRef, minute, month, year, setDay, setHour, setMinute, setMonth, setYear } =
		useDatePickerFunctionality({ onSelect: onChange, date: note.endTime, isAlwaysOpen: true });

	return (
		<div className='flex flex-col gap-y-1' ref={menuRef}>
			<p className='font-semibold'>Note start time</p>
			<div
				className={cn(
					'mt-2 flex w-fit rounded-md border border-neutral-100 p-1 text-sm transition-opacity dark:border-neutral-800 dark:text-neutral-100',
					isPending && 'pointer-events-none opacity-50',
				)}>
				{/* Year */}
				<input
					placeholder='yyyy'
					type='text'
					value={year}
					onChange={e => setYear(e.target.value)}
					onKeyDown={handleKeyDown}
					className='w-12 bg-transparent px-1 focus:outline-none'
					autoFocus
				/>
				/{/* Month */}
				<input
					placeholder='mm'
					type='text'
					value={month}
					onChange={e => setMonth(e.target.value)}
					onKeyDown={handleKeyDown}
					className='w-8 bg-transparent px-1 focus:outline-none'
				/>
				/{/* Day */}
				<input
					placeholder='dd'
					type='text'
					value={day}
					onChange={e => setDay(e.target.value)}
					onKeyDown={handleKeyDown}
					className='w-8 bg-transparent px-1 focus:outline-none'
				/>
				{/* Hour */}
				<input
					placeholder='hh'
					type='text'
					value={hour}
					onChange={e => setHour(e.target.value)}
					onKeyDown={handleKeyDown}
					className='w-8 bg-transparent px-1 focus:outline-none'
				/>
				:{/* Minute */}
				<input
					placeholder='mm'
					type='text'
					value={minute}
					onChange={e => setMinute(e.target.value)}
					onKeyDown={handleKeyDown}
					className='w-8 bg-transparent px-1 focus:outline-none'
				/>
			</div>
		</div>
	);
};

export default NoteEndTime;
