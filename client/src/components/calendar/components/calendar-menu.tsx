import { useSettings } from '../../../hooks/use-settings';
import { Menubar, MenubarLabel } from '../../menubar';
import CalendarMenuBackForward from './menu/back-forward';
import CalendarMenuDisplayedDays from './menu/displayed-days';
import CalendarMenuFilterCourses from './menu/filter-courses';
import CalendarMenuGoTo from './menu/go-to';
import CalendarMenuViewMode from './menu/view-mode';
import CalendarMenuZoom from './menu/zoom';

/**
 * A top bar above the calendar grid.
 * User can use it for navigation, zooming in/out, etc.
 */
const CalendarMenu = () => {
	const { firstCalendarDay, viewMode } = useSettings();

	const currentMonth = firstCalendarDay.toLocaleString('default', {
		month: 'long',
	});
	const currentYear = firstCalendarDay.getFullYear();

	return (
		<>
			<Menubar className='sticky top-0 z-20 h-10 text-nowrap rounded-none border-0 bg-white shadow-none dark:bg-neutral-900'>
				<MenubarLabel className='w-32 cursor-default select-none justify-center hover:bg-transparent data-[state=open]:bg-white dark:hover:bg-transparent dark:data-[state=open]:bg-transparent'>
					{currentMonth} {currentYear}
				</MenubarLabel>

				<CalendarMenuViewMode />
				<CalendarMenuFilterCourses />

				{viewMode === 'days' && <CalendarMenuDisplayedDays />}

				{viewMode !== 'list' && (
					<>
						<CalendarMenuGoTo />
						<CalendarMenuBackForward />
					</>
				)}

				{viewMode === 'days' && <CalendarMenuZoom />}
			</Menubar>
		</>
	);
};

export default CalendarMenu;
