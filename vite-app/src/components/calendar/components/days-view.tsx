'use client';

import { useSettings } from '@/hooks/use-settings';
import { useEffect, useRef } from 'react';
import { useCalendarContext } from '../context/calendar-context';
import DaysViewGrid from './days-view-grid';
import DaysViewNotes from './days-view-notes';
import DaysViewTopbar from './days-view-topbar';

const DaysView = () => {
	// Used to keep the same calendar scroll y level even after switching routes
	const { calendarScrollTop, setCalendarScrollTop } = useCalendarContext();
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const { zoomIn, zoomOut, goDayBackward, goDayForward } = useSettings();

	const handleScroll = () => {
		setCalendarScrollTop(scrollContainerRef.current!.scrollTop);
	};

	useEffect(() => {
		scrollContainerRef.current!.scrollTop = calendarScrollTop;
	}, [calendarScrollTop]);

	// Handle zooming in/out with keyboard
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.metaKey && (event.key === '=' || event.key === '-')) {
				event.preventDefault();
				if (event.key === '=') {
					zoomIn();
				} else if (event.key === '-') {
					zoomOut();
				}
			} else if (event.key === 'ArrowLeft') {
				goDayBackward();
			} else if (event.key === 'ArrowRight') {
				goDayForward();
			}
		};

		const handleWheel = (event: WheelEvent) => {
			if (event.metaKey) {
				event.preventDefault();
				if (event.deltaY > 0) {
					zoomOut();
				} else {
					zoomIn();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('wheel', handleWheel, { passive: false });
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('wheel', handleWheel);
		};
	}, [zoomIn, zoomOut, goDayBackward, goDayForward]);

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
