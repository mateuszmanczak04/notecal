'use client';

import updateSettings from '@/actions/settings/update-settings';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import sortTasks from '@/lib/sort-tasks';
import { useTransition } from 'react';
import { BeatLoader } from 'react-spinners';

const SortTasks = () => {
	const [isPending, startTransition] = useTransition();

	const onSortChange = (value: string) => {
		if (
			value &&
			(value === 'title' ||
				value === 'createdAt' ||
				value === 'dueDate' ||
				value === 'priority' ||
				value === 'completed')
		) {
			startTransition(() => {
				updateSettings({ orderTasks: value });
				sortTasks(value);
			});
		}
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				className=' w-full select-none border-none bg-primary/5 shadow-none outline-none hover:bg-primary/10 sm:w-40 dark:bg-white/5 dark:hover:bg-white/10'
				asChild>
				<Button variant='outline' className='flex items-center gap-1'>
					<span>Order By</span>{' '}
					{isPending && <BeatLoader className='h-4 w-4' />}
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
