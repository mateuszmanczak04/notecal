'use client';

import HourRow from './hour-row';
import DayColumn from './day-column';
import { useCalendarContext } from '../_context/calendar-context';
import DayHeading from './day-heading';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Grid = () => {
	const { getDayAfter, displayedDays, goDayBackward, goDayForward } =
		useCalendarContext();
	const days = new Array(displayedDays)
		.fill(0)
		.map((_, index) => getDayAfter(index));

	return (
		<div className='flex flex-col'>
			{/* Top bar: */}
			<div className='flex flex-1'>
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

			{/* Grid */}
			<div className='flex'>
				<div className='w-20'>
					{new Array(24).fill(0).map((_, index) => (
						<HourRow key={index} hour={index} />
					))}
				</div>
				<div
					className='grid flex-1 overflow-y-scroll'
					style={{ gridTemplateColumns: `repeat(${displayedDays}, 1fr)` }}>
					{days.map((day, index) => (
						<DayColumn
							key={day.toString()}
							isLast={index === displayedDays - 1}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Grid;
