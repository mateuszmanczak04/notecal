'use client';

import { useCalendarContext } from '../_context/calendar-context';
import DaysView from './days-view';
import FilterCourses from './filter-courses';
import Header from './header';
import MonthView from './month-view';
import TopBar from './top-bar';

const CalendarPage = () => {
	const { viewMode } = useCalendarContext();

	return (
		<div className='flex h-full flex-col'>
			{/* Year and month, back, forward, zoom in/out */}
			<Header />

			{/* Dates */}
			<TopBar />

			{viewMode === 'days' && <DaysView />}
			{viewMode === 'month' && <MonthView />}

			<FilterCourses />
		</div>
	);
};

export default CalendarPage;
