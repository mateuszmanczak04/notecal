'use client';

import { useSettings } from '@/hooks/use-settings';
import CalendarMenu from './calendar-menu';
import DaysView from './days-view';
import FilterCourses from './filter-courses';
import ListView from './list-view';
import MonthView from './month-view';

const CalendarPage = () => {
	const { viewMode } = useSettings();

	return (
		<div className='flex h-full flex-col'>
			{/* Year and month, back, forward, zoom in/out */}
			<CalendarMenu />

			{viewMode === 'days' && <DaysView />}
			{viewMode === 'month' && <MonthView />}
			{viewMode === 'list' && <ListView />}

			<FilterCourses />
		</div>
	);
};

export default CalendarPage;
