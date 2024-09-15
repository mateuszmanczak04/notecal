'use client';

import ErrorMessage from '@/components/common/error-message';
import useCourses from '../courses/_hooks/use-courses';
import useNotes from '../notes/_hooks/use-notes';
import Grid from './_components/grid';
import Header from './_components/header';
import Notes from './_components/notes';
import TopBar from './_components/top-bar';

const CalendarPage = () => {
	const { error: notesError } = useNotes();
	const { error: coursesError } = useCourses();

	return (
		<div className='flex h-full flex-col'>
			{/* Year and month: */}
			<Header />

			{/* Errors */}
			{notesError && (
				<ErrorMessage className='mt-4'>
					{notesError.message}
				</ErrorMessage>
			)}
			{coursesError && (
				<ErrorMessage className='mt-4'>
					{coursesError.message}
				</ErrorMessage>
			)}

			<TopBar />

			<div className='relative overflow-y-scroll overscroll-none outline-none scrollbar-hide'>
				{/* Just grid: */}
				<Grid />

				{/* Notes on top: */}
				<Notes />
			</div>
		</div>
	);
};

export default CalendarPage;
