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
import updateNoteStartTimeLocal from '@/lib/update-note-start-time-local';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useTransition } from 'react';

const StartTime = () => {
	const { currentNote, course } = useNoteContext();
	let startTime = currentNote.startTime;
	const [isPending, startTransition] = useTransition();

	// todo - add error handling and use of useOptimistic
	const onChange = (newStartTime?: Date) => {
		if (!newStartTime) return;

		// todo - display a message telling you can't set it like that
		// and set the input state to state before changes
		if (newStartTime > currentNote.endTime) return;

		startTransition(() => {
			updateNote({ id: currentNote.id, startTime: newStartTime });
			updateNoteStartTimeLocal(currentNote.id, course.id, newStartTime);
		});
	};

	const handleChangeHourAndMinute = ({
		hour,
		minute,
	}: {
		hour: number;
		minute: number;
	}) => {
		const newStartTime = new Date(currentNote.startTime);
		newStartTime.setHours(hour);
		newStartTime.setMinutes(minute);
		onChange(newStartTime);
	};

	return (
		<div className='flex items-center gap-1'>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant={'outline'}
						className={cn(
							'pl-3 text-left font-normal',
							!startTime && 'text-muted-foreground',
						)}>
						{startTime ? format(startTime, 'PPP') : <span>Pick a date</span>}
						<CalendarIcon className='ml-1 h-4 w-4 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-auto p-0' align='start'>
					<Calendar
						mode='single'
						selected={startTime || undefined}
						onSelect={onChange}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<TimePicker
				initialHour={currentNote.startTime.getHours()}
				initialMinute={currentNote.startTime.getMinutes()}
				onChange={handleChangeHourAndMinute}
			/>
		</div>
	);
};

export default StartTime;
