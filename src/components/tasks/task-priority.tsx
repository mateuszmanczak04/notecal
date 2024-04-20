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
import { cn } from '@/lib/utils';
import { TaskPriority as TaskPriorityEnum } from '@prisma/client';
import { FC, useState, useTransition } from 'react';

interface TaskPriorityProps {
	id: string;
	priority?: TaskPriorityEnum;
}

const TaskPriority: FC<TaskPriorityProps> = ({
	id,
	priority: initialPriority,
}) => {
	const [priority, setPriority] = useState<TaskPriorityEnum | 'none'>(
		initialPriority || 'none',
	);
	const [isPending, startTransition] = useTransition();

	// todo - add error handling and use of useOptimistic
	const onChange = (newPriority: string) => {
		if (
			newPriority !== 'high' &&
			newPriority !== 'medium' &&
			newPriority !== 'low' &&
			newPriority !== 'none'
		)
			return;
		startTransition(() => {
			updateTaskPriority({
				id,
				newPriority,
			});
			setPriority(newPriority);
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='-mt-1 h-6 pt-0'>
				<Badge
					className={cn(
						'pointer-events-none shadow-none',
						priority === 'high' && 'bg-red-500',
						priority === 'medium' && 'bg-amber-500',
						priority === 'low' && 'bg-green-500',
					)}>
					{priority.toLocaleUpperCase()}
				</Badge>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Choose the priority</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={priority} onValueChange={onChange}>
					<DropdownMenuRadioItem value='high' className='cursor-pointer'>
						High
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='medium' className='cursor-pointer'>
						Medium
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='low' className='cursor-pointer'>
						Low
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='none' className='cursor-pointer'>
						None
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TaskPriority;
