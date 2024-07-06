'use client';

import HoursColumn from './hours-column';
import DayColumn from './day-column';
import { useCalendarContext } from '../_context/calendar-context';
import useSettings from '@/app/settings/_hooks/use-settings';

export const AMOUNT_OF_DAYS = 5; // TODO: get from settings

const Grid = () => {
	const { getDayAfter } = useCalendarContext();
	const days = new Array(AMOUNT_OF_DAYS)
		.fill(0)
		.map((_, index) => getDayAfter(index));

	return (
		<div className='flex'>
			<HoursColumn />
			{days.map((day, index) => {
				if (index === AMOUNT_OF_DAYS - 1)
					return <DayColumn key={day.toString()} date={day} isLast />;
				return <DayColumn key={day.toString()} date={day} />;
			})}
		</div>
	);
};

export default Grid;
