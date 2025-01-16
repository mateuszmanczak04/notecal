'use client';

import LoadingSpinner from '@/components/loading-spinner';
import { useSettings } from '@/hooks/use-settings';
import { useUser } from '@/hooks/use-user';
import DaysViewDayHeading from './days-view-day-heading';

const TopBar = () => {
	const { getDayAfter } = useSettings();
	const { data: user } = useUser();

	// Should not occur in normal app conditions
	if (!user) return;

	const isNotesPending = false;
	const isCoursesPending = false;
	const days = new Array(user.displayedDays).fill(0).map((_, index) => getDayAfter(index));

	return (
		<div className='mt-4 flex'>
			<div className='grid h-calendar-header w-12 place-content-center rounded-tl-xl border sm:w-20 dark:border-neutral-600'>
				{(isNotesPending || isCoursesPending) && <LoadingSpinner className='h-5 w-5' />}
			</div>

			{/* Mon, Tue, Wed, etc.: */}
			<div
				className='grid flex-1'
				style={{
					gridTemplateColumns: `repeat(${user.displayedDays}, 1fr)`,
				}}>
				{days.map((day, index) => (
					<DaysViewDayHeading key={day.toString()} date={day} isLast={index === user.displayedDays - 1} />
				))}
			</div>
		</div>
	);
};

export default TopBar;
