'use client';

import DropdownMenu, {
	DropdownMenuValueType,
} from '@/components/common/dropdown-menu';
import { FC } from 'react';
import useSettings from '../_hooks/use-settings';

interface DefaultNoteDurationSettingProps {
	initialDefaultNoteDuration: number;
}

const DefaultNoteDurationSetting: FC<DefaultNoteDurationSettingProps> = ({
	initialDefaultNoteDuration,
}) => {
	const { update: updateSettings } = useSettings();

	const options = [
		{
			value: 15,
			label: '15 min',
		},
		{
			value: 30,
			label: '30 min',
		},
		{
			value: 45,
			label: '45 min',
		},
		{
			value: 60,
			label: '60 min',
		},
		{
			value: 90,
			label: '90 min',
		},
		{
			value: 120,
			label: '120 min',
		},
		{
			value: 180,
			label: '180 min',
		},
	];

	const currentOption = {
		value: initialDefaultNoteDuration,
		label: initialDefaultNoteDuration.toString() + ' min',
	};

	const handleChange = (value: DropdownMenuValueType) => {
		updateSettings({ defaultNoteDuration: value as number });
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

export default DefaultNoteDurationSetting;
