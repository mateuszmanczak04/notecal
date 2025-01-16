'use client';

import { useSettings } from '@/hooks/use-settings';
import DaysViewDayColumn from './days-view-day-column';
import HourRow from './hour-row';

const DaysViewGrid = () => {
	const { displayedDays } = useSettings();

	return (
		<div className='flex'>
			{/* Hours: */}
			<div className='w-12 text-sm sm:w-20 sm:text-base '>
				{new Array(24).fill(0).map((_, index) => (
					<HourRow key={index} hour={index} />
				))}
			</div>

			{/* Empty grid: */}
			<div
				className='grid flex-1'
				style={{
					gridTemplateColumns: `repeat(${displayedDays}, 1fr)`,
				}}>
				{new Array(displayedDays).fill(0).map((_, index) => (
					<DaysViewDayColumn key={index} isLast={index === displayedDays - 1} />
				))}
			</div>
		</div>
	);
};

export default DaysViewGrid;
