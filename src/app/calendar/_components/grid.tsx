'use client';

import HourRow from './hour-row';
import DayColumn from './day-column';
import { useCalendarContext } from '../_context/calendar-context';

const Grid = () => {
	const { displayedDays } = useCalendarContext();

	return (
		<div className='flex'>
			{/* Hours: */}
			<div className='w-20'>
				{new Array(24).fill(0).map((_, index) => (
					<HourRow key={index} hour={index} />
				))}
			</div>

			{/* Empty grid: */}
			<div
				className='grid flex-1 overflow-y-scroll'
				style={{ gridTemplateColumns: `repeat(${displayedDays}, 1fr)` }}>
				{new Array(displayedDays).fill(0).map((day, index) => (
					<DayColumn
						key={day.toString()}
						isLast={index === displayedDays - 1}
					/>
				))}
			</div>
		</div>
	);
};

export default Grid;
