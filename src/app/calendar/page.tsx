'use client';

import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import useCourses from '../courses/_hooks/use-courses';
import useNotes from '../notes/_hooks/use-notes';
import Grid from './_components/grid';
import Header from './_components/header';
import Notes from './_components/notes';
import TopBar from './_components/top-bar';

const CalendarPage = () => {
	const { notes, error, isPending } = useNotes();
	const { isPending: isCoursesPending } = useCourses();

	if (isPending || isCoursesPending)
		return (
			<div className='grid h-full w-full place-content-center'>
				<div className='flex flex-col gap-4'>
					<LoadingSpinner />
					<p className='animate-pulse'>
						Give us a second, we are loading your notes and courses
						😅
					</p>
				</div>
			</div>
		);

	if (error) {
		return <ErrorMessage>{error.message}</ErrorMessage>;
	}

	if (!notes) return null;

	return (
		<div className='flex h-full flex-col'>
			{/* Year and month: */}
			<Header />
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
