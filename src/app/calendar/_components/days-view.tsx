'use client';

import { useSettings } from '@/hooks/use-settings';
import { useEffect, useRef } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import DaysViewGrid from './days-view-grid';
import DaysViewNotes from './days-view-notes';
import TopBar from './top-bar';

type Props = {};

const DaysView = ({}: Props) => {
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

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [zoomIn, zoomOut, goDayBackward, goDayForward]);

	return (
		<>
			{/* Dates */}
			<TopBar />
			<div className='relative outline-none scrollbar-hide' onScroll={handleScroll} ref={scrollContainerRef}>
				{/* Just grid: */}
				<DaysViewGrid />

				{/* Notes on top: */}
				<DaysViewNotes />
			</div>
		</>
	);
};

export default DaysView;
