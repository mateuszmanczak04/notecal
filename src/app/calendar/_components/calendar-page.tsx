'use client';

import ErrorMessage from '@/components/common/error-message';
import { useEffect, useRef } from 'react';
import useCourses from '../../courses/_hooks/use-courses';
import useNotes from '../../notes/_hooks/use-notes';
import { useCalendarContext } from '../_context/calendar-context';
import Grid from './grid';
import Header from './header';
import Notes from './notes';
import TopBar from './top-bar';

const CalendarPage = () => {
	const { error: notesError } = useNotes();
	const { error: coursesError } = useCourses();

	// Used to keep the same calendar scroll y level even after
	// switching routes
	const { scrollTop, setScrollTop } = useCalendarContext();
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);

	const handleScroll = () => {
		setScrollTop(scrollContainerRef.current!.scrollTop);
	};

	useEffect(() => {
		scrollContainerRef.current!.scrollTop = scrollTop;
	}, [scrollTop]);

	return (
		<div className='flex h-full flex-col'>
			{/* Year and month: */}
			<Header />

			{/* Errors */}
			{notesError && <ErrorMessage className='mt-4'>{notesError.message}</ErrorMessage>}
			{coursesError && <ErrorMessage className='mt-4'>{coursesError.message}</ErrorMessage>}

			<TopBar />

			<div
				className='relative overflow-y-scroll overscroll-none scroll-auto outline-none scrollbar-hide'
				onScroll={handleScroll}
				ref={scrollContainerRef}
			>
				{/* Just grid: */}
				<Grid />

				{/* Notes on top: */}
				<Notes />
			</div>
		</div>
	);
};

export default CalendarPage;
