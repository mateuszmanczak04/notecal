'use client';

import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { cn } from '@/utils/cn';
import { TaskPriority as T_TaskPriority, Task } from '@prisma/client';
import { useTaskPriority } from '../_hooks/use-task-priority';

type T_Props = {
	task: Task;
};

export const getTaskPriorityTitle = (priority: T_TaskPriority | null) => {
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

const TaskPriority = ({ task }: T_Props) => {
	const { updateTaskPriority: handleSelect, isPending } = useTaskPriority(task);

	return (
		<DropdownMenu className={cn('w-52', isPending && 'pointer-events-none opacity-50')}>
			<DropdownMenuTrigger showChevron>{getTaskPriorityTitle(task.priority)}</DropdownMenuTrigger>
			<DropdownMenuList>
				{([null, 'A', 'B', 'C'] as (T_TaskPriority | null)[]).map(priority => (
					<DropdownMenuItem key={priority || 'none'} onSelect={handleSelect} value={priority}>
						{getTaskPriorityTitle(priority)}
					</DropdownMenuItem>
				))}
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default TaskPriority;
