import { useSettings } from '../../../hooks/use-settings';
import DaysViewDayHeading from './days-view-day-heading';

const DaysViewTopbar = () => {
	const { getDayAfter, displayedDays } = useSettings();

	const days = new Array(displayedDays).fill(0).map((_, index) => getDayAfter(index));

	return (
		<div className='sticky top-10 z-20 flex w-full bg-white dark:bg-neutral-900'>
			<div className='grid h-10 w-12 place-content-center border border-l-0 border-neutral-300 sm:w-20 dark:border-neutral-600'></div>

			{/* Mon, Tue, Wed, etc.: */}
			<div
				className='grid flex-1'
				style={{
					gridTemplateColumns: `repeat(${displayedDays}, 1fr)`,
				}}>
				{days.map(day => (
					<DaysViewDayHeading key={day.toString()} date={day} />
				))}
			</div>
		</div>
	);
};

export default DaysViewTopbar;
