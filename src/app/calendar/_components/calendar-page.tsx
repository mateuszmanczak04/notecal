'use client';

import { useCalendarContext } from '../_context/calendar-context';
import DaysView from './days-view';
import FilterCourses from './filter-courses';
import Header from './header';
import ListView from './list-view';
import MonthView from './month-view';

const CalendarPage = () => {
	const { viewMode } = useCalendarContext();

	return (
		<div className='flex h-full flex-col'>
			{/* Year and month, back, forward, zoom in/out */}
			<Header />

			{viewMode === 'days' && <DaysView />}
			{viewMode === 'month' && <MonthView />}
			{viewMode === 'list' && <ListView />}

			<FilterCourses />
		</div>
	);
};

export default CalendarPage;
