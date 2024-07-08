'use client';

import LoadingSpinner from '@/components/common/loading-spinner';
import Grid from './_components/grid';
import Header from './_components/header';
import Notes from './_components/notes';
import ErrorMessage from '@/components/common/error-message';
import useNotes from '../notes/_hooks/use-notes';

const CalendarPage = () => {
	const { notes, error, isPending } = useNotes();

	if (isPending || !notes) return <LoadingSpinner />;

	if (error) {
		return <ErrorMessage>{error.message}</ErrorMessage>;
	}

	return (
		<>
			{/* Year and month: */}
			<Header />

			<div className='relative mt-2'>
				{/* Just grid: */}
				<Grid />

				{/* Notes on top: */}
				<Notes />
			</div>
		</>
	);
};

export default CalendarPage;
