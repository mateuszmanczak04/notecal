'use client';

import { FC, useLayoutEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

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
		<Card className='flex flex-col gap-2 border-none bg-primary/5 p-4 shadow-none md:p-6 dark:border-none dark:bg-white/5'>
			<h2 className='text-lg font-semibold'>Theme</h2>
			<div className='flex items-center gap-2'>
				<Switch
					id='dark-mode-switch'
					checked={isDarkMode}
					onCheckedChange={handleChange}
				/>
				<Label htmlFor='dark-mode-switch'>Dark mode</Label>
			</div>
		</Card>
	);
};

export default ThemeSetting;
