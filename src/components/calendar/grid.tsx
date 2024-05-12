'use client';

import { useCalendarContext } from '@/components/calendar/calendar-context';
import CalendarHours from '@/components/calendar/hours';
import CalendarDayGrid from './day-grid';

const LeftBorderRect = ({ last = false }: { last?: boolean }) => {
	if (last)
		return <div className='box-border h-16 w-4 border-y border-gray-300'></div>;
	return <div className='box-border h-16 w-4 border-t border-gray-300'></div>;
};

const CalendarGrid = () => {
	const { notes, currentFirstDay } = useCalendarContext();

	return (
		<div className='mt-2 flex'>
			<CalendarHours />
			{/* left border: */}
			<div className='ml-2 w-2 border-r border-gray-300'>
				{new Array(23).fill(0).map((_, i) => (
					<LeftBorderRect key={i} />
				))}
				<LeftBorderRect last />
			</div>
			{new Array(7).fill(0).map((_, i) => {
				const date = new Date(currentFirstDay);
				date.setTime(date.getTime() + i * 24 * 60 * 60 * 1000);
				return <CalendarDayGrid key={date.toString()} date={date} />;
			})}
		</div>
	);
};

export default CalendarGrid;
