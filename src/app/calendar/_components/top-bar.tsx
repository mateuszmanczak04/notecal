'use client';

import LoadingSpinner from '@/components/loading-spinner';
import { FC } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import DayHeading from './day-heading';

interface TopBarProps {}

const TopBar: FC<TopBarProps> = ({}) => {
	const { getDayAfter, displayedDays } = useCalendarContext();
	const isNotesPending = false;
	const isCoursesPending = false;
	const days = new Array(displayedDays).fill(0).map((_, index) => getDayAfter(index));

	return (
		<div className='mt-4 flex'>
			<div className='grid h-calendar-header w-12 place-content-center rounded-tl-xl border dark:border-neutral-600 sm:w-20'>
				{(isNotesPending || isCoursesPending) && <LoadingSpinner className='h-5 w-5' />}
			</div>

			{/* Mon, Tue, Wed, etc.: */}
			<div
				className='grid flex-1'
				style={{
					gridTemplateColumns: `repeat(${displayedDays}, 1fr)`,
				}}>
				{days.map((day, index) => (
					<DayHeading key={day.toString()} date={day} isLast={index === displayedDays - 1} />
				))}
			</div>
		</div>
	);
};

export default TopBar;
