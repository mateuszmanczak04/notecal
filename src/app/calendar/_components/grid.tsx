'use client';

import HoursColumn from './hours-column';
import DayColumn from './day-column';
import { useCalendarContext } from '../_context/calendar-context';
import DayHeading from './day-heading';

const Grid = () => {
	const { getDayAfter, displayedDays } = useCalendarContext();
	const days = new Array(displayedDays)
		.fill(0)
		.map((_, index) => getDayAfter(index));

	console.log(displayedDays);

	return (
		<div className='flex'>
			<HoursColumn />

			<div className='flex-1'>
				{/* Headings: */}
				<div
					className='grid'
					style={{ gridTemplateColumns: `repeat(${displayedDays}, 1fr)` }}>
					{days.map((day, index) => (
						<DayHeading
							key={day.toString()}
							date={day}
							isLast={index === displayedDays - 1}
						/>
					))}
				</div>

				{/* Grid */}
				<div
					className='grid'
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
