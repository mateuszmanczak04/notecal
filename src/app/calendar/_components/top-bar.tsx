'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';
import DayHeading from './day-heading';
import { useCalendarContext } from '../_context/calendar-context';

interface TopBarProps {}

const TopBar: FC<TopBarProps> = ({}) => {
	const { getDayAfter, displayedDays, goDayBackward, goDayForward } =
		useCalendarContext();
	const days = new Array(displayedDays)
		.fill(0)
		.map((_, index) => getDayAfter(index));

	return (
		<div className='mt-4 flex'>
			{/* Left & Right: */}
			<div className='flex h-calendar-header w-20 font-semibold'>
				<button
					className='flex flex-1 cursor-pointer items-center justify-center rounded-tl-xl border hover:bg-gray-100'
					onClick={goDayBackward}>
					<ChevronLeft className='h-5 w-5' />
				</button>
				<button
					className='flex flex-1 cursor-pointer items-center justify-center border-b border-r border-t hover:bg-gray-100'
					onClick={goDayForward}>
					<ChevronRight className='h-5 w-5' />
				</button>
			</div>

			{/* Mon, Tue, Wed, etc.: */}
			<div
				className='grid flex-1'
				style={{ gridTemplateColumns: `repeat(${displayedDays}, 1fr)` }}>
				{days.map((day, index) => (
					<DayHeading
						key={day.toString()}
						date={day}
						isLast={index === displayedDays - 1}
					/>
				))}
			</div>
		</div>
	);
};

export default TopBar;
