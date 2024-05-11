'use client';

import { updateNoteEndTime } from '@/actions/notes/update-note-end-time';
import { updateNoteStartTime } from '@/actions/notes/update-note-start-time';
import { useNoteContext } from '@/components/notes/note-context';
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

const NoteEndTime = () => {
	const { currentNote, course } = useNoteContext();
	let endTime = currentNote.endTime;
	const [isPending, startTransition] = useTransition();

	// todo - add error handling and use of useOptimistic
	const onChange = (newEndTime?: Date) => {
		if (newEndTime) {
			startTransition(() => {
				updateNoteEndTime({ id: currentNote.id, newEndTime });
				updateNoteEndTimeLocal(currentNote.id, course.id, newEndTime);
			});
		}
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'h-6 pl-3 text-left font-normal',
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
	);
};

export default NoteEndTime;
