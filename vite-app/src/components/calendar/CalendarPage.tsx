import { useSettings } from '../../hooks/use-settings';
import CalendarMenu from './components/calendar-menu';
import DaysView from './components/days-view';
import ListView from './components/list-view';
import MonthView from './components/month-view';

// export const metadata: Metadata = {
// 	title: 'Notecal | Calendar view',
// 	robots: {
// 		index: false,
// 	},
// };

const CalendarPage = () => {
	const { viewMode } = useSettings();

	return (
		<div className='flex h-full flex-col'>
			{/* Year and month, back, forward, zoom in/out */}
			<CalendarMenu />

			{viewMode === 'days' && <DaysView />}
			{viewMode === 'month' && <MonthView />}
			{viewMode === 'list' && <ListView />}
		</div>
	);
};

export default CalendarPage;
