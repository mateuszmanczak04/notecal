'use client';

import Grid from './_components/grid';
import Header from './_components/header';
import Notes from './_components/notes';

const CalendarPage = () => {
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
