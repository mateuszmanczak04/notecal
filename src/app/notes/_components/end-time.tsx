'use client';

import updateNote from '@/app/notes/_actions/update-note';
import { useNoteContext } from '@/app/notes/_context/note-context';
import TimePicker from '@/app/notes/_components/time-picker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import updateNoteEndTimeLocal from '@/lib/update-note-end-time-local';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTransition } from 'react';

const EndTime = () => {
	const { currentNote, course } = useNoteContext();
	let endTime = currentNote.endTime;
	const [isPending, startTransition] = useTransition();

	// todo - add error handling and use of useOptimistic
	const onChange = (newEndTime?: Date) => {
		if (!newEndTime) return;

		// todo - display a message telling you can't set it like that
		// and set the input state to state before changes
		if (newEndTime < currentNote.startTime) return;

		startTransition(() => {
			updateNote({ id: currentNote.id, endTime: newEndTime });
			updateNoteEndTimeLocal(currentNote.id, course.id, newEndTime);
		});
	};

	const handleChangeHourAndMinute = ({
		hour,
		minute,
	}: {
		hour: number;
		minute: number;
	}) => {
		const newEndTime = new Date(currentNote.endTime);
		newEndTime.setHours(hour);
		newEndTime.setMinutes(minute);
		onChange(newEndTime);
	};

	return (
		<div className='flex items-center gap-1'>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={'outline'}
						className={cn(
							'pl-3 text-left font-normal',
							!endTime && 'text-muted-foreground',
						)}>
						{endTime ? format(endTime, 'PPP') : <span>Pick a date</span>}
						<CalendarIcon className='ml-1 h-4 w-4 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start'>
					<Calendar
						mode='single'
						selected={endTime || undefined}
						onSelect={onChange}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<TimePicker
				initialHour={currentNote.endTime.getHours()}
				initialMinute={currentNote.endTime.getMinutes()}
				onChange={handleChangeHourAndMinute}
			/>
		</div>
	);
};

export default EndTime;
