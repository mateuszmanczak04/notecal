'use client';

import { getTasks } from '@/actions/get-tasks';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from '../ui/button';

const SortTasks = ({}) => {
	const queryClient = useQueryClient();

	const onSortChange = (value: string) => {
		if (
			value &&
			(value === 'title' ||
				value === 'createdAt' ||
				value === 'dueDate' ||
				value === 'priority' ||
				value === 'completed')
		) {
			queryClient.fetchQuery({
				queryKey: ['tasks'],
				queryFn: async () => await getTasks({ orderBy: value }),
			});
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='-mt-1 h-6 w-full flex-1 -translate-y-1 select-none pt-0 outline-none'>
				<Button variant='outline' className='w-full'>
					Order By
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Order by</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					defaultValue='title'
					onValueChange={onSortChange}>
					<DropdownMenuRadioItem value='title' className='cursor-pointer'>
						Title
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='dueDate' className='cursor-pointer'>
						Due date
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='priority' className='cursor-pointer'>
						Priority
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='createdAt' className='cursor-pointer'>
						Newest first
					</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value='completed' className='cursor-pointer'>
						Completed first
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SortTasks;
