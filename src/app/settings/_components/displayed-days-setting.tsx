'use client';

import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuList,
	DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import useSettings from '../_hooks/use-settings';

type Props = {
	initialDisplayedDays: number;
};

const DisplayedDaysSetting = ({ initialDisplayedDays }: Props) => {
	const { update: updateSettings } = useSettings();

	const handleSelect = (displayedDays: number) => {
		updateSettings({ displayedDays });
	};

	return (
		<div>
			<h2 className='mb-2 text-lg font-semibold'>
				Amount of days in week view
			</h2>
			<DropdownMenu>
				<DropdownMenuTrigger showChevron>
					{initialDisplayedDays}
				</DropdownMenuTrigger>
				<DropdownMenuList>
					{[1, 2, 3, 4, 5, 6, 7].map(amount => (
						<DropdownMenuItem
							onSelect={handleSelect}
							key={amount}
							value={amount}>
							{amount}
						</DropdownMenuItem>
					))}
				</DropdownMenuList>
			</DropdownMenu>
		</div>
	);
};

export default DisplayedDaysSetting;
