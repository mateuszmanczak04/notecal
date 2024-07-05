'use client';

import getWeekdayName from '@/lib/get-weekday-name';
import { useCalendarContext } from '@/components/calendar/calendar-context';

const WeekDayName = ({ day, date }: { day: string; date: string }) => {
	return (
		<div className='flex-1'>
			<p className='text-lg font-semibold'>{day}</p>
			<p className='text-sm text-gray-500'>{date}</p>
		</div>
	);
};

const CalendarWeekdayNames = () => {
	const { currentFirstDay } = useCalendarContext();

	return (
		<div className='mt-2 flex flex-1 justify-between'>
			<div className='w-16'></div>
			{new Array(7).fill(0).map((_, i) => {
				const date = new Date(currentFirstDay);
				date.setTime(date.getTime() + i * 24 * 60 * 60 * 1000);
				return (
					<WeekDayName
						key={date.toString()}
						day={getWeekdayName(date.getDay())}
						date={date.toDateString()}
					/>
				);
			})}
		</div>
	);
};

export default CalendarWeekdayNames;
