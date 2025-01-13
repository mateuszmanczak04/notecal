'use client';

import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { useCalendarContext } from '../_context/calendar-context';
import ViewSwitcher from './view-switcher';

const Header = () => {
	const { currentFirstDay, zoomIn, zoomOut, goDayBackward, goDayForward, goToToday } = useCalendarContext();
	const currentMonth = currentFirstDay.toLocaleString('default', {
		month: 'long',
	});
	const currentYear = currentFirstDay.getFullYear();

	return (
		<div className='z-50 flex items-center justify-between gap-2'>
			<h2 className='text-2xl font-bold sm:text-3xl'>
				{currentMonth} {currentYear}
			</h2>

			<div className='flex flex-col gap-2 sm:flex-row'>
				<ViewSwitcher />

				<button
					className='flex h-10 cursor-pointer items-center justify-center rounded-md border px-4 hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'
					aria-label='today'
					title='today'
					onClick={goToToday}>
					Today
				</button>

				{/* Left & Right */}
				<div className='flex h-calendar-header w-20'>
					<button
						className='flex flex-1 cursor-pointer items-center justify-center rounded-l-md border hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'
						aria-label='go day before'
						title='go day before'
						onClick={goDayBackward}>
						<ChevronLeft />
					</button>
					<button
						className='flex flex-1 cursor-pointer items-center justify-center rounded-r-md border-b border-r border-t hover:bg-neutral-100 dark:border-neutral-600 dark:hover:bg-neutral-700'
						aria-label='go day after'
						title='go day after'
						onClick={goDayForward}>
						<ChevronRight />
					</button>
				</div>

				{/* Zoom in/out */}
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
			</div>
		</div>
	);
};

export default Header;
