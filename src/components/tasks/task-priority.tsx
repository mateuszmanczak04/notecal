'use client';

import { updateTaskPriority } from '@/actions/update-task-priority';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { NO_TASK_PRIORITY, cn } from '@/lib/utils';
import { TaskPriority as TaskPriorityEnum } from '@prisma/client';
import { FC, useState, useTransition } from 'react';

interface TaskPriorityProps {
	id: string;
	priority: TaskPriorityEnum | null;
}

const TaskPriority: FC<TaskPriorityProps> = ({
	id,
	priority: initialPriority,
}) => {
	const [priority, setPriority] = useState<TaskPriorityEnum | null>(
		initialPriority,
	);
	const [isPending, startTransition] = useTransition();

	// todo - add error handling and use of useOptimistic
	const onChange = (newPriority: string) => {
		if (
			newPriority !== 'high' &&
			newPriority !== 'medium' &&
			newPriority !== 'low' &&
			newPriority !== NO_TASK_PRIORITY
		)
			return;
		startTransition(() => {
			updateTaskPriority({
				id,
				newPriority,
			});
			setPriority(newPriority === NO_TASK_PRIORITY ? null : newPriority);
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='-mt-1 h-6 select-none pt-0 outline-none'>
				<Badge
					className={cn(
						'pointer-events-none shadow-none',
						priority === 'high' && 'bg-red-500',
						priority === 'medium' && 'bg-amber-500',
						priority === 'low' && 'bg-green-500',
						isPending && 'opacity-75',
					)}>
					{(priority || NO_TASK_PRIORITY).toLocaleUpperCase()}
				</Badge>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Choose the priority</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={priority || NO_TASK_PRIORITY}
					onValueChange={onChange}>
					<DropdownMenuRadioItem value='high' className='cursor-pointer'>
						High
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='medium' className='cursor-pointer'>
						Medium
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='low' className='cursor-pointer'>
						Low
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem
						value={NO_TASK_PRIORITY}
						className='cursor-pointer'>
						None
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TaskPriority;
