'use client';

import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuList,
	DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { TaskPriority } from '@prisma/client';
import useTasks from '../_hooks/use-tasks';

type PriorityProps = {
	id: string;
	priority: TaskPriority | null;
};

const getPriorityTitle = (priority: 'A' | 'B' | 'C' | null) => {
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

const Priority = ({ id, priority }: PriorityProps) => {
	const { update: updateTask } = useTasks();

	const handleSelect = (priority: any) => {
		updateTask({
			id,
			priority,
		});
	};

	return (
		<DropdownMenu className='w-52'>
			<DropdownMenuTrigger>
				{getPriorityTitle(priority)}
			</DropdownMenuTrigger>
			<DropdownMenuList>
				<DropdownMenuItem
					onSelect={handleSelect}
					value='A'
					className='flex items-center justify-center gap-2'>
					{getPriorityTitle('A')}
				</DropdownMenuItem>
				<DropdownMenuItem
					onSelect={handleSelect}
					value='B'
					className='flex items-center justify-center gap-2'>
					{getPriorityTitle('B')}
				</DropdownMenuItem>
				<DropdownMenuItem
					onSelect={handleSelect}
					value='C'
					className='flex items-center justify-center gap-2'>
					{getPriorityTitle('C')}
				</DropdownMenuItem>
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default Priority;
