'use client';

import { updateNoteStartTime } from '@/actions/notes/update-note-start-time';
import { useNoteContext } from '@/components/notes/note-context';
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

const NoteStartTime = () => {
	const { currentNote, course } = useNoteContext();
	let startTime = currentNote.startTime;
	const [isPending, startTransition] = useTransition();

	// todo - add error handling and use of useOptimistic
	const onChange = (newStartTime?: Date) => {
		if (newStartTime) {
			startTransition(() => {
				updateNoteStartTime({ id: currentNote.id, newStartTime });
				updateNoteStartTimeLocal(currentNote.id, course.id, newStartTime);
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
	);
};

export default NoteStartTime;
