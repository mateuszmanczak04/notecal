'use client';

import LoadingSpinner from '@/components/common/loading-spinner';
import Grid from './_components/grid';
import Header from './_components/header';
import Notes from './_components/notes';
import ErrorMessage from '@/components/common/error-message';
import useNotes from '../notes/_hooks/use-notes';
import TopBar from './_components/top-bar';

const CalendarPage = () => {
	const { notes, error, isPending } = useNotes();

	if (isPending) return <LoadingSpinner />;

	if (error) {
		return <ErrorMessage>{error.message}</ErrorMessage>;
	}

	if (!notes) return null;

	return (
		<div className='flex h-full flex-col'>
			{/* Year and month: */}
			<Header />
			<TopBar />

			<div className='relative overflow-y-scroll'>
				{/* Just grid: */}
				<Grid />

				{/* Notes on top: */}
				<Notes />
			</div>
		</div>
	);
};

export default CalendarPage;
