'use client';

import { useSettings } from '@/hooks/use-settings';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import DisplayedDays from './displayed-days';
import ViewModeSwitcher from './view-mode-switcher';

const Header = () => {
	const {
		firstCalendarDay,
		zoomIn,
		zoomOut,
		goDayBackward,
		goDayForward,
		goToToday,
		viewMode,
		goMonthForward,
		goMonthBackward,
	} = useSettings();
	const currentMonth = firstCalendarDay.toLocaleString('default', {
		month: 'long',
	});
	const currentYear = firstCalendarDay.getFullYear();

	const handleForward = () => {
		if (viewMode === 'days') {
			goDayForward();
		} else if (viewMode === 'month') {
			goMonthForward();
		}
	};

	const handleBackward = () => {
		if (viewMode === 'days') {
			goDayBackward();
		} else if (viewMode === 'month') {
			goMonthBackward();
		}
	};

	return (
		<div className='z-10 flex items-center justify-between gap-2'>
			{/* Title */}
			{['days', 'month'].includes(viewMode) && (
				<h2 className='text-2xl font-bold sm:text-3xl'>
					{currentMonth} {currentYear}
				</h2>
			)}

			{/* Title */}
			{['list'].includes(viewMode) && <h2 className='text-2xl font-bold sm:text-3xl'>Your notes</h2>}

			<div className='flex flex-col gap-2 sm:flex-row'>
				{viewMode === 'days' && <DisplayedDays />}

				{/* Today button */}
				{['days', 'month'].includes(viewMode) && (
					<button
						className='flex h-10 cursor-pointer items-center justify-center rounded-md border px-4 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'
						aria-label='today'
						title='today'
						onClick={goToToday}>
						Today
					</button>
				)}

				{/* Left & Right */}
				{['days', 'month'].includes(viewMode) && (
					<div className='flex h-calendar-header w-20'>
						<button
							className='flex flex-1 cursor-pointer items-center justify-center rounded-l-md border hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'
							aria-label='go day before'
							title='go day before'
							onClick={handleBackward}>
							<ChevronLeft />
						</button>
						<button
							className='flex flex-1 cursor-pointer items-center justify-center rounded-r-md border-b border-r border-t hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'
							aria-label='go day after'
							title='go day after'
							onClick={handleForward}>
							<ChevronRight />
						</button>
					</div>
				)}

				{/* Zoom in/out */}
				{['days'].includes(viewMode) && (
					<div className='flex h-calendar-header w-20'>
						<button
							className='flex flex-1 cursor-pointer items-center justify-center rounded-l-md border hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'
							aria-label='zoom out'
							title='zoom out'
							onClick={zoomOut}>
							<Minus />
						</button>
						<button
							className='flex flex-1 cursor-pointer items-center justify-center rounded-r-md border-b border-r border-t hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'
							aria-label='zoom in'
							title='zoom in'
							onClick={zoomIn}>
							<Plus />
						</button>
					</div>
				)}

				<ViewModeSwitcher />
			</div>
		</div>
	);
};

export default Header;
