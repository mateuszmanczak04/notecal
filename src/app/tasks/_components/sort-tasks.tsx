'use client';

import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { useToast } from '@/components/toast/use-toast';
import { useSettings } from '@/hooks/use-settings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sortTasks, T_SortTasksInput } from '../_actions/sort-tasks';

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
	const { tasksOrder, setTasksOrder } = useSettings();
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: sortTasks,
		onMutate: (data: T_SortTasksInput) => {},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			// queryClient.invalidateQueries({ queryKey: ['tasks'] });
			if (data && 'tasks' in data) {
				queryClient.setQueryData(['tasks'], data.tasks);
			}
		},
	});

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
			mutate({ newOrder: newCriteria });
		}
	};

	return (
		<DropdownMenu className='relative flex-1'>
			<DropdownMenuTrigger showChevron>Sort tasks</DropdownMenuTrigger>
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
