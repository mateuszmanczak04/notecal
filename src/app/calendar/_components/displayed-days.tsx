'use client';

import { Button } from '@/components/button';
import { T_DisplayedDays, useSettings } from '@/hooks/use-settings';
import { Minus, Plus } from 'lucide-react';

type Props = {};

const DisplayedDays = ({}: Props) => {
	const { displayedDays, setDisplayedDays } = useSettings();

	const handleMinus = () => {
		setDisplayedDays(prev => (prev === 1 ? 1 : ((prev - 1) as T_DisplayedDays)));
	};

	const handlePlus = () => {
		setDisplayedDays(prev => (prev === 7 ? 7 : ((prev + 1) as T_DisplayedDays)));
	};

	return (
		<div className='flex select-none items-center' title='Amount of days displayed at once'>
			<Button
				onClick={handleMinus}
				disabled={displayedDays === 1}
				className='h-10 w-10 rounded-l-md rounded-r-none border border-neutral-300 bg-transparent p-0 text-neutral-800 hover:bg-neutral-100 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-700'>
				<Minus />
			</Button>
			<p className='flex h-10 flex-col items-center justify-center border-b border-t border-neutral-300 px-4 leading-10 dark:border-neutral-600'>
				<span className='text-sm font-semibold'>{displayedDays}</span>
				<span className='-mt-1 text-xs opacity-75'>Days</span>
			</p>
			<Button
				onClick={handlePlus}
				disabled={displayedDays === 7}
				className='h-10 w-10 rounded-l-none rounded-r-md border border-neutral-300 bg-transparent p-0 text-neutral-800 hover:bg-neutral-100 dark:border-neutral-600 dark:text-white dark:hover:bg-neutral-700'>
				<Plus />
			</Button>
		</div>
	);
};

export default DisplayedDays;
