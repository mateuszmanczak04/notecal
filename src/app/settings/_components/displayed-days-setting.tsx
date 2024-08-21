'use client';

import DropdownMenu, {
	DropdownMenuValueType,
} from '@/components/common/dropdown-menu';
import useSettings from '../_hooks/use-settings';

type Props = {
	initialDisplayedDays: number;
};

const DisplayedDaysSetting = ({ initialDisplayedDays }: Props) => {
	const { update: updateSettings } = useSettings();

	const options = [
		{
			value: 1,
			label: '1',
		},
		{
			value: 2,
			label: '2',
		},
		{
			value: 3,
			label: '3',
		},
		{
			value: 4,
			label: '4',
		},
		{
			value: 5,
			label: '5',
		},
		{
			value: 6,
			label: '6',
		},
		{
			value: 7,
			label: '7',
		},
	];

	const currentOption = {
		value: initialDisplayedDays,
		label: initialDisplayedDays.toString(),
	};

	const handleChange = (value: DropdownMenuValueType) => {
		updateSettings({ displayedDays: value as number });
	};

	return (
		<div>
			<h2 className='mb-2 text-lg font-semibold'>
				Amount of days in week view
			</h2>
			<DropdownMenu
				options={options}
				currentOption={currentOption}
				onChange={handleChange}
			/>
		</div>
	);
};

export default DisplayedDaysSetting;
