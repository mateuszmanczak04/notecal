'use client';

import updateSettings from '@/app/settings/_actions/update-settings';
import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const SortTasks = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate, isPending } = useMutation({
		mutationFn: updateSettings,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['user'] });
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
			mutate({ orderTasks: newCriteria });
		}
	};
	return (
		<DropdownMenu className={cn('relative flex-1', isPending && 'opacity-50')}>
			<DropdownMenuTrigger showChevron>Order by</DropdownMenuTrigger>
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
