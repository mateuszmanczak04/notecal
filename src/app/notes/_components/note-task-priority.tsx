'use client';

import updateTask from '@/app/tasks/_actions/update-task';
import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { TaskPriority as T_TaskPriority, Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type T_Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
};

const getPriorityTitle = (priority: T_TaskPriority | null) => {
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

const NoteTaskPriority = ({ task, forPage = 'tasks' }: T_Props) => {
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
				{([null, 'A', 'B', 'C'] as (T_TaskPriority | null)[]).map(priority => (
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

export default NoteTaskPriority;
