'use client';

import { useEffect, useRef } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import DaysViewGrid from './days-view-grid';
import DaysViewNotes from './days-view-notes';
import TopBar from './top-bar';

type Props = {};

const DaysView = ({}: Props) => {
	// Used to keep the same calendar scroll y level even after switching routes
	const { scrollTop, setScrollTop, zoomIn, zoomOut, goDayBackward, goDayForward } = useCalendarContext();
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => {
		setScrollTop(scrollContainerRef.current!.scrollTop);
	};

	useEffect(() => {
		scrollContainerRef.current!.scrollTop = scrollTop;
	}, [scrollTop]);

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
			<div
				className='relative mb-4 overflow-y-scroll overscroll-none scroll-auto outline-none scrollbar-hide'
				onScroll={handleScroll}
				ref={scrollContainerRef}>
				{/* Just grid: */}
				<DaysViewGrid />

				{/* Notes on top: */}
				<DaysViewNotes />
			</div>
		</>
	);
};

export default DaysView;
