'use client';

import { updateTaskDueDate } from '@/actions/update-task-due-date';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Task } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { FC, useTransition } from 'react';

interface TaskTitleProps {
	id: string;
	dueDate: Date | null;
}

const TaskDueDate: FC<TaskTitleProps> = ({ id, dueDate }) => {
	const [isPending, startTransition] = useTransition();
	const queryClient = useQueryClient();

	// todo - add error handling and use of useOptimistic
	const onChange = (date: any) => {
		if (date) {
			startTransition(() => {
				updateTaskDueDate({ id, newDueDate: date.toString() });
				queryClient.setQueryData(['tasks'], (old: { tasks: Task[] }) => {
					const oldTasks = old.tasks;
					return {
						tasks: oldTasks.map(task => {
							if (task.id === id) {
								return { ...task, dueDate: date };
							}
							return task;
						}),
					};
				});
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
						!dueDate && 'text-muted-foreground',
						isPending && 'opacity-75',
					)}>
					{dueDate ? format(dueDate, 'PPP') : <span>Pick a date</span>}
					<CalendarIcon className='ml-1 h-4 w-4 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-auto p-0' align='start'>
				<Calendar
					mode='single'
					selected={dueDate || undefined}
					onSelect={onChange}
					initialFocus
				/>
			</PopoverContent>
		</Popover>
	);
};

export default TaskDueDate;
