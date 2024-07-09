'use client';

import HoursColumn from './hours-column';
import DayColumn from './day-column';
import { useCalendarContext } from '../_context/calendar-context';

const Grid = () => {
	const { getDayAfter, daysToSee } = useCalendarContext();
	const days = new Array(daysToSee)
		.fill(0)
		.map((_, index) => getDayAfter(index));

	return (
		<div className='flex'>
			<HoursColumn />
			{days.map((day, index) => {
				if (index === daysToSee - 1)
					return <DayColumn key={day.toString()} date={day} isLast />;
				return <DayColumn key={day.toString()} date={day} />;
			})}
		</div>
	);
};

export default Grid;
