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
			<DropdownMenuTrigger showChevron>
				{getPriorityTitle(priority)}{' '}
			</DropdownMenuTrigger>
			<DropdownMenuList>
				{([null, 'A', 'B', 'C'] as (TaskPriority | null)[]).map(
					priority => (
						<DropdownMenuItem
							key={priority || 'none'}
							onSelect={handleSelect}
							value={priority}>
							{getPriorityTitle(priority)}
						</DropdownMenuItem>
					),
				)}
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default Priority;
