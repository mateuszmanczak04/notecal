'use client';

import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { useCalendarContext } from '../_context/calendar-context';

/**
 * A component to change week/month/list view in calendar grid
 */
const ViewSwitcher = () => {
	const { viewMode, setViewMode } = useCalendarContext();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				showChevron
				className='h-10 rounded-md border-neutral-200 bg-transparent hover:bg-neutral-100 dark:border-neutral-600 dark:bg-transparent dark:hover:bg-neutral-700'>
				View mode
			</DropdownMenuTrigger>
			<DropdownMenuList>
				<DropdownMenuItem onSelect={setViewMode} value='days'>
					Days
				</DropdownMenuItem>
				<DropdownMenuItem onSelect={setViewMode} value='month'>
					Month
				</DropdownMenuItem>
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default ViewSwitcher;
