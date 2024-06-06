'use client';

import { FC } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ThemeSettingProps {}

const ThemeSetting: FC<ThemeSettingProps> = ({}) => {
	return (
		<div className='flex flex-col gap-2 rounded-md border border-gray-200 bg-white p-4 md:p-6'>
			<h2 className='text-lg font-semibold'>Theme</h2>
			<div className='flex items-center gap-2'>
				<Switch id='dark-mode-switch' />
				<Label htmlFor='dark-mode-switch'>Dark mode</Label>
			</div>
		</div>
	);
};

export default ThemeSetting;
