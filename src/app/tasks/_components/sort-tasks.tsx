'use client';

import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { useSettings } from '@/hooks/use-settings';

const getNameOfCriteria = (criteria: string) => {
	if (criteria === 'title') {
		return 'Title';
	}
	if (criteria === 'createdAt') {
		return 'Newest first';
	}
	if (criteria === 'dueDate') {
		return 'Due date';
	}
	if (criteria === 'priority') {
		return 'Priority';
	}
	if (criteria === 'completed') {
		return 'Completed';
	}
	return '';
};

const SortTasks = () => {
	// TODO: implement sorting them in UI, not only in settings
	const { tasksOrder, setTasksOrder } = useSettings();

	const handleSort = (newCriteria: string) => {
		if (
			newCriteria &&
			(newCriteria === 'title' ||
				newCriteria === 'createdAt' ||
				newCriteria === 'dueDate' ||
				newCriteria === 'priority' ||
				newCriteria === 'completed')
		) {
			setTasksOrder(newCriteria);
		}
	};

	return (
		<DropdownMenu className='relative flex-1'>
			<DropdownMenuTrigger showChevron>Order by ({getNameOfCriteria(tasksOrder)})</DropdownMenuTrigger>
			<DropdownMenuList>
				<DropdownMenuItem value='title' onSelect={handleSort}>
					Title
				</DropdownMenuItem>
				<DropdownMenuItem value='createdAt' onSelect={handleSort}>
					Newest first
				</DropdownMenuItem>
				<DropdownMenuItem value='dueDate' onSelect={handleSort}>
					Due date
				</DropdownMenuItem>
				<DropdownMenuItem value='priority' onSelect={handleSort}>
					Priority
				</DropdownMenuItem>
				<DropdownMenuItem value='completed' onSelect={handleSort}>
					Completed
				</DropdownMenuItem>
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default SortTasks;
