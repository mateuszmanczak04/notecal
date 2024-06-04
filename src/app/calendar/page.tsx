'use client';

import { CalendarContextProvider } from '@/components/calendar/calendar-context';
import CalendarGrid from '@/components/calendar/calendar-grid';
import CalendarTopBar from '@/components/calendar/calendar-top-bar';

const CalendarPage = () => {
	return (
		<CalendarContextProvider>
			<div className='w-full min-w-[800px] p-4'>
				<CalendarTopBar />
				<CalendarGrid />
			</div>
		</CalendarContextProvider>
	);
};

export default CalendarPage;
