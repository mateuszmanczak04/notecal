'use client';

import DayColumn from './_components/day-column';
import HoursColumn from './_components/hours-column';

const CalendarPage = () => {
	const currentDate = new Date();
	const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
	const currentYear = currentDate.getFullYear();

	return (
		<>
			<h2 className='text-3xl font-bold'>
				{currentMonth} {currentYear}
			</h2>
			<div className='mt-2 flex'>
				<HoursColumn />
				<DayColumn date={currentDate} />
				<DayColumn
					date={new Date(currentDate.getTime() + 24 * 60 * 60 * 1000)}
				/>
				<DayColumn
					date={new Date(currentDate.getTime() + 2 * 24 * 60 * 60 * 1000)}
				/>
				<DayColumn
					date={new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000)}
				/>
				<DayColumn
					date={new Date(currentDate.getTime() + 4 * 24 * 60 * 60 * 1000)}
					isLast
				/>
			</div>
		</>
	);
};

export default CalendarPage;
