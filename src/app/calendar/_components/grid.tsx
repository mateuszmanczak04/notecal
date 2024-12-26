'use client';

import { useAppContext } from '@/app/_components/app-context';
import DayColumn from './day-column';
import HourRow from './hour-row';

const Grid = () => {
	const { settings } = useAppContext();

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
					gridTemplateColumns: `repeat(${settings.displayedDays}, 1fr)`,
				}}>
				{new Array(settings.displayedDays).fill(0).map((_, index) => (
					<DayColumn key={index} isLast={index === settings.displayedDays - 1} />
				))}
			</div>
		</div>
	);
};

export default Grid;
