'use client';

import { useCalendarContext } from '../_context/calendar-context';
import { ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';

const Header = () => {
	const { currentFirstDay, zoomIn, zoomOut, goDayBackward, goDayForward } =
		useCalendarContext();
	const currentMonth = currentFirstDay.toLocaleString('default', {
		month: 'long',
	});
	const currentYear = currentFirstDay.getFullYear();

	return (
		<div className='flex items-center justify-between gap-2'>
			<h2 className='text-3xl font-bold'>
				{currentMonth} {currentYear}
			</h2>

			<div className='flex flex-col gap-2 sm:flex-row'>
				{/* Left & Right */}
				<div className='flex h-calendar-header w-20'>
					<button
						className='flex flex-1 cursor-pointer items-center justify-center rounded-l-md border hover:bg-neutral-100'
						onClick={goDayBackward}>
						<ChevronLeft className='h-5 w-5' />
					</button>
					<button
						className='flex flex-1 cursor-pointer items-center justify-center rounded-r-md border-b border-r border-t hover:bg-neutral-100'
						onClick={goDayForward}>
						<ChevronRight className='h-5 w-5' />
					</button>
				</div>

				{/* Zoom in/out */}
				<div className='flex h-calendar-header w-20'>
					<button
						className='flex flex-1 cursor-pointer items-center justify-center rounded-l-md border hover:bg-neutral-100'
						onClick={zoomOut}>
						<Minus className='h-5 w-5' />
					</button>
					<button
						className='flex flex-1 cursor-pointer items-center justify-center rounded-r-md border-b border-r border-t hover:bg-neutral-100'
						onClick={zoomIn}>
						<Plus className='h-5 w-5' />
					</button>
				</div>
			</div>
		</div>
	);
};

export default Header;
