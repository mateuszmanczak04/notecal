'use client';

import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { cn } from '@/utils/cn';
import { Task, TaskPriority } from '@prisma/client';
import { useTransition } from 'react';
import updateTask from '../_actions/update-task';

type Props = {
	task: Task;
};

const getPriorityTitle = (priority: TaskPriority | null) => {
	switch (priority) {
		case 'A':
			return (
				<>
					<div className='h-3 w-3 shrink-0 rounded-full bg-red-500'></div>
					High
				</>
			);
		case 'B':
			return (
				<>
					<div className='h-3 w-3 shrink-0 rounded-full bg-yellow-500'></div>
					Medium
				</>
			);
		case 'C':
			return (
				<>
					<div className='h-3 w-3 shrink-0 rounded-full bg-green-500'></div>
					Low
				</>
			);
		default:
			return 'None';
	}
};

const Priority = ({ task }: Props) => {
	const [isPending, startTransition] = useTransition();

	const handleSelect = (newPriority: any) => {
		startTransition(async () => {
			await updateTask({
				id: task.id,
				priority: newPriority,
			});
		});
	};
	return (
		<DropdownMenu className={cn('w-52', isPending && 'opacity-50')}>
			<DropdownMenuTrigger showChevron>{getPriorityTitle(task.priority)}</DropdownMenuTrigger>
			<DropdownMenuList>
				{([null, 'A', 'B', 'C'] as (TaskPriority | null)[]).map(priority => (
					<DropdownMenuItem key={priority || 'none'} onSelect={handleSelect} value={priority}>
						{getPriorityTitle(priority)}
					</DropdownMenuItem>
				))}
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default Priority;
