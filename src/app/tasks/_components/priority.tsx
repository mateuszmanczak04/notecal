'use client';

import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Task, TaskPriority } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateTask from '../_actions/update-task';

type Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
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

const Priority = ({ task, forPage = 'tasks' }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: updateTask,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});

	const handleSelect = (newPriority: any) => {
		mutate({
			id: task.id,
			priority: newPriority,
		});
	};
	return (
		<DropdownMenu
			className={cn('w-52', forPage === 'notes' && 'w-full', isPending && 'pointer-events-none opacity-50')}>
			<DropdownMenuTrigger showChevron className={cn(forPage === 'notes' && 'text-sm')}>
				{getPriorityTitle(task.priority)}
			</DropdownMenuTrigger>
			<DropdownMenuList>
				{([null, 'A', 'B', 'C'] as (TaskPriority | null)[]).map(priority => (
					<DropdownMenuItem
						key={priority || 'none'}
						onSelect={handleSelect}
						value={priority}
						className={cn(forPage === 'notes' && 'text-sm')}>
						{getPriorityTitle(priority)}
					</DropdownMenuItem>
				))}
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default Priority;
