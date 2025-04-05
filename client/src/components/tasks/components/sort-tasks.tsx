import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSettings } from '../../../hooks/use-settings';
import { Button } from '../../button';
import { useToast } from '../../toast/use-toast';

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
				<Button variant='secondary' className='mb-0 select-none'>
					Sort tasks ({getNameOfCriteria(tasksOrder)})
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuPortal>
				<DropdownMenuContent className='select-none rounded-xl border border-neutral-200 bg-white p-2 text-sm shadow-2xl dark:border-neutral-600 dark:bg-neutral-800'>
					<DropdownMenuItem
						className='rounded-md px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-0 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
						onClick={() => handleSort('title')}>
						Title
					</DropdownMenuItem>
					<DropdownMenuItem
						className='rounded-md px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-0 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
						onClick={() => handleSort('createdAt')}>
						Newest first
					</DropdownMenuItem>
					<DropdownMenuItem
						className='rounded-md px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-0 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
						onClick={() => handleSort('dueDate')}>
						Due date
					</DropdownMenuItem>
					<DropdownMenuItem
						className='rounded-md px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-0 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
						onClick={() => handleSort('priority')}>
						Priority
					</DropdownMenuItem>
					<DropdownMenuItem
						className='rounded-md px-2 py-1 hover:bg-neutral-100 focus:bg-neutral-100 focus:outline-0 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
						onClick={() => handleSort('completed')}>
						Completed
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenuPortal>
		</DropdownMenu>
	);
};

export default SortTasks;
