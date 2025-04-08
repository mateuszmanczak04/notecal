import { useEffect, useRef } from 'react';
import { useCalendarContext } from '../context/calendar-context';
import DaysViewGrid from './days-view-grid';
import DaysViewNotes from './days-view-notes';
import DaysViewTopbar from './days-view-topbar';

const DaysView = () => {
	// Used to keep the same calendar scroll y level even after switching routes
	const { calendarScrollTop, setCalendarScrollTop } = useCalendarContext();
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => {
		setCalendarScrollTop(scrollContainerRef.current!.scrollTop);
	};

	useEffect(() => {
		scrollContainerRef.current!.scrollTop = calendarScrollTop;
	}, [calendarScrollTop]);

	return (
		<>
			{/* Dates */}
			<DaysViewTopbar />
			<div className='scrollbar-hide relative outline-none' onScroll={handleScroll} ref={scrollContainerRef}>
				{/* Just grid: */}
				<DaysViewGrid />

				{/* Notes on top: */}
				<DaysViewNotes />
			</div>
		</>
	);
};

export default DaysView;
