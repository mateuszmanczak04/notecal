'use client';

import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuList,
	DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import useSettings from '../_hooks/use-settings';

type Props = {
	initialDefaultNoteDuration: number;
};

const DefaultNoteDurationSetting = ({ initialDefaultNoteDuration }: Props) => {
	const { update: updateSettings } = useSettings();

	const handleSelect = (defaultNoteDuration: number) => {
		updateSettings({ defaultNoteDuration });
	};

	return (
		<div>
			<h2 className='mb-2 text-lg font-semibold'>Default new note duration</h2>
			<DropdownMenu>
				<DropdownMenuTrigger showChevron>{initialDefaultNoteDuration} min</DropdownMenuTrigger>
				<DropdownMenuList>
					{[15, 30, 45, 60, 90, 120, 180].map(minutes => (
						<DropdownMenuItem onSelect={handleSelect} key={minutes} value={minutes}>
							{minutes} min
						</DropdownMenuItem>
					))}
				</DropdownMenuList>
			</DropdownMenu>
		</div>
	);
};

export default DefaultNoteDurationSetting;
