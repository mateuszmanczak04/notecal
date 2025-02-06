'use client';

import { getTaskPriorityTitle } from '@/app/tasks/_components/task-priority';
import { useTaskPriority } from '@/app/tasks/_hooks/use-task-priority';
import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { cn } from '@/utils/cn';
import { TaskPriority as T_TaskPriority, Task } from '@prisma/client';

type T_Props = {
	task: Task;
};

const NoteTaskPriority = ({ task }: T_Props) => {
	const { handleSelect, isPending } = useTaskPriority(task);

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

export default NoteTaskPriority;
