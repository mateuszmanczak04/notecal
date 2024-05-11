'use client';

import { useNoteContext } from '@/components/notes/note-context';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

const NoteStartTime = ({}) => {
	const { note } = useNoteContext();
	const startTime = note.startTime;
	const isPending = false;

	const onChange = () => {};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'h-6 pl-3 text-left font-normal',
						!startTime && 'text-muted-foreground',
						isPending && 'opacity-75',
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
