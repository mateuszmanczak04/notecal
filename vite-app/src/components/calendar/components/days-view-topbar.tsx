import LoadingSpinner from '../../../components/loading-spinner';
import { useSettings } from '../../../hooks/use-settings';
import DaysViewDayHeading from './days-view-day-heading';

const DaysViewTopbar = () => {
	const { getDayAfter, displayedDays } = useSettings();

	const isNotesPending = false;
	const isCoursesPending = false;
	const days = new Array(displayedDays).fill(0).map((_, index) => getDayAfter(index));

	return (
		<div className='sticky top-10 z-40 flex w-full bg-white dark:bg-neutral-900'>
			<div className='h-calendar-header grid w-12 place-content-center border sm:w-20 dark:border-neutral-600'>
				{(isNotesPending || isCoursesPending) && <LoadingSpinner className='h-5 w-5' />}
			</div>

			{/* Mon, Tue, Wed, etc.: */}
			<div
				className='grid flex-1'
				style={{
					gridTemplateColumns: `repeat(${displayedDays}, 1fr)`,
				}}
			>
				{days.map(day => (
					<DaysViewDayHeading key={day.toString()} date={day} />
				))}
			</div>
		</div>
	);
};

export default DaysViewTopbar;
