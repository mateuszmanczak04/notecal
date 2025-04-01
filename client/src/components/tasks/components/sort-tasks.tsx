import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ChevronDown } from 'lucide-react';
import { useSettings } from '../../../hooks/use-settings';
import { Button } from '../../button';
import { useToast } from '../../toast/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../ui/dropdown-menu';

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
	return 'Custom';
};

const SortTasks = () => {
	const { tasksOrder, setTasksOrder } = useSettings();
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: async (data: { newOrder: string }) =>
			await fetch('/api/tasks/sort', {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			}).then(res => res.json()),
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
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
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant='secondary' className='mb-0 w-full'>
					Sort tasks ({getNameOfCriteria(tasksOrder)}) <ChevronDown className='size-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onClick={() => handleSort('title')}>Title</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleSort('createdAt')}>Newest first</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleSort('dueDate')}>Due date</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleSort('priority')}>Priority</DropdownMenuItem>
				<DropdownMenuItem onClick={() => handleSort('completed')}>Completed</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SortTasks;
