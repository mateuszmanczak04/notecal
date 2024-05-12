'use client';

import CalendarMenu from '@/components/calendar/menu';
import CalendarWeekdayNames from '@/components/calendar/weekday-names';

const CalendarTopBar = () => {
	return (
		<div className='flex w-full flex-col justify-between'>
			<CalendarMenu />
			<CalendarWeekdayNames />
		</div>
	);
};

export default CalendarTopBar;
