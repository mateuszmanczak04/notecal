'use client';

import { useEffect, useRef } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import Grid from './grid';
import Header from './header';
import Notes from './notes';
import TopBar from './top-bar';

const CalendarPage = () => {
	// Used to keep the same calendar scroll y level even after switching routes
	const { scrollTop, setScrollTop, zoomIn, zoomOut } = useCalendarContext();
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => {
		setScrollTop(scrollContainerRef.current!.scrollTop);
	};

	useEffect(() => {
		scrollContainerRef.current!.scrollTop = scrollTop;
	}, [scrollTop]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.metaKey && (event.key === '=' || event.key === '-')) {
				event.preventDefault();
				if (event.key === '=') {
					zoomIn();
				} else if (event.key === '-') {
					zoomOut();
				}
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [zoomIn, zoomOut]);

	return (
		<div className='flex h-full flex-col'>
			{/* Year and month, back, forward, zoom in/out */}
			<Header />

			{/* Dates */}
			<TopBar />

			<div
				className='relative overflow-y-scroll overscroll-none scroll-auto outline-none scrollbar-hide'
				onScroll={handleScroll}
				ref={scrollContainerRef}>
				{/* Just grid: */}
				<Grid />

				{/* Notes on top: */}
				<Notes />
			</div>
		</div>
	);
};

export default CalendarPage;
