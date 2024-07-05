'use client';

import updateTask from '@/actions/tasks/update-task';
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
import { updateTaskPriority as updateTaskPriorityLocal } from '@/lib/update-task';
import { cn } from '@/lib/utils';
import { TaskPriority as TaskPriorityEnum } from '@prisma/client';
import { FC, useTransition } from 'react';

interface TaskPriorityProps {
	id: string;
	priority: TaskPriorityEnum | null;
}

const NO_TASK_PRIORITY = 'none';

const getPriorityName = (priority: TaskPriorityEnum | null) => {
	if (priority === 'A') return 'High';
	if (priority === 'B') return 'Medium';
	if (priority === 'C') return 'Low';
	return 'No priority';
};

const TaskPriority: FC<TaskPriorityProps> = ({ id, priority }) => {
	const [isPending, startTransition] = useTransition();

	// todo - add error handling and use of useOptimistic
	const onChange = (newPriority: string) => {
		if (
			newPriority !== 'A' &&
			newPriority !== 'B' &&
			newPriority !== 'C' &&
			newPriority !== NO_TASK_PRIORITY
		) {
			return;
		}
		startTransition(() => {
			updateTask({
				id,
				priority: newPriority === NO_TASK_PRIORITY ? null : newPriority,
			});
			updateTaskPriorityLocal(
				id,
				newPriority === NO_TASK_PRIORITY ? null : newPriority,
			);
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='-mt-1 h-6 select-none pt-0 outline-none'>
				<Badge
					className={cn(
						'pointer-events-none bg-accent text-foreground shadow-none',
						priority === 'A' && 'bg-red-500 text-white',
						priority === 'B' && 'bg-amber-500 text-white',
						priority === 'C' && 'bg-green-500 text-white',
					)}>
					{getPriorityName(priority)}
				</Badge>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Choose the priority</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={priority || NO_TASK_PRIORITY}
					onValueChange={onChange}>
					<DropdownMenuRadioItem value='A' className='cursor-pointer'>
						High
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='B' className='cursor-pointer'>
						Medium
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='C' className='cursor-pointer'>
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
