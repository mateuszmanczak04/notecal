'use client';

import { renameTask } from '@/actions/rename-task';
import { updateTaskDueDate } from '@/actions/update-task-due-date';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FC, useRef, useState, useTransition } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface TaskTitleProps {
	id: string;
	dueDate?: Date;
}

const TaskDueDate: FC<TaskTitleProps> = ({ id, dueDate: initialDueDate }) => {
	const [dueDate, setDueDate] = useState<Date | undefined>(initialDueDate);
	const [isPending, startTransition] = useTransition();

	// todo - add error handling and use of useOptimistic
	const onChange = (date: any) => {
		startTransition(() => {
			updateTaskDueDate({ id, newDueDate: date.toString() });
			setDueDate(date);
		});
	};

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'h-6 pl-3 text-left font-normal',
						!dueDate && 'text-muted-foreground',
					)}>
					{dueDate ? format(dueDate, 'PPP') : <span>Pick a date</span>}
					<CalendarIcon className='ml-1 h-4 w-4 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					mode='single'
					selected={dueDate}
					onSelect={onChange}
					disabled={date => date < new Date()}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};

export default TaskDueDate;
