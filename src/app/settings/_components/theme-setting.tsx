'use client';

import { FC, useLayoutEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface ThemeSettingProps {}

const ThemeSetting: FC<ThemeSettingProps> = ({}) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useLayoutEffect(() => {
		if (localStorage.theme === 'dark') {
			setIsDarkMode(true);
		} else {
			setIsDarkMode(false);
		}
	}, []);

	const handleChange = (newValue: boolean) => {
		if (newValue) {
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
		} else {
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
		}
		setIsDarkMode(newValue);
	};

	return (
		<div className='flex flex-col gap-2'>
			<h2 className='text-lg font-semibold'>Theme</h2>
			<div className='flex items-center'>
				<Switch
					id='dark-mode-switch'
					checked={isDarkMode}
					onCheckedChange={handleChange}
				/>
				<Label
					htmlFor='dark-mode-switch'
					className='cursor-pointer select-none pl-2'>
					Dark mode
				</Label>
			</div>
		</div>
	);
};

export default ThemeSetting;
