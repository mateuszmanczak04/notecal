'use client';

import { useCalendarContext } from '@/components/calendar/calendar-context';
import CalendarHours from '@/components/calendar/calendar-hours';
import CalendarDayGrid from './calendar-day-grid';

const LeftBorderRect = ({ last = false }: { last?: boolean }) => {
	if (last)
		return <div className='box-border h-16 w-2 border-y-2 border-accent'></div>;
	return <div className='box-border h-16 w-2 border-t-2 border-accent'></div>;
};

const CalendarGrid = () => {
	const { notes, currentFirstDay } = useCalendarContext();

	return (
		<div className='mt-2 flex'>
			<CalendarHours />
			{/* left border: */}
			<div className='ml-2 w-2 border-r-2 border-primary/25 dark:border-white/10'>
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
