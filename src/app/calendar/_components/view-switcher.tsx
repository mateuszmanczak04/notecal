'use client';

import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';

/**
 * A component to change week/month/list view in calendar grid
 */
const ViewSwitcher = () => {
	const handleSelect = (value: 'days' | 'month') => {};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				showChevron
				className='h-10 rounded-md border-neutral-200 bg-transparent hover:bg-neutral-100 dark:border-neutral-600 dark:bg-transparent dark:hover:bg-neutral-700'>
				View mode
			</DropdownMenuTrigger>
			<DropdownMenuList>
				<DropdownMenuItem onSelect={handleSelect} value='days'>
					Days
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={handleSelect} value='month'>
					Month
				</DropdownMenuItem>
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default ViewSwitcher;
