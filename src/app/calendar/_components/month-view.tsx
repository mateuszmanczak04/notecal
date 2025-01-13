'use client';

import { addDays, getDaysInMonth, startOfMonth } from 'date-fns';
import { useEffect } from 'react';
import { useCalendarContext } from '../_context/calendar-context';

const MonthView = () => {
	const { currentFirstDay } = useCalendarContext();

	useEffect(() => {
		const firstDayOfMonth = startOfMonth(currentFirstDay);
		const daysInMonth = getDaysInMonth(currentFirstDay);
		const days = new Array(daysInMonth).fill(firstDayOfMonth).map((day, index) => addDays(day, index));
	}, [currentFirstDay]);

	return <div className='month-view'>Month view</div>;
};

export default MonthView;
