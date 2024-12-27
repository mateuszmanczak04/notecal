'use client';

import { useUser } from '@/app/_hooks/use-user';
import DayColumn from './day-column';
import HourRow from './hour-row';

const Grid = () => {
	const { data: user } = useUser();

	// Should not occur in normal app conditions
	if (!user) return;

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
					gridTemplateColumns: `repeat(${user.displayedDays}, 1fr)`,
				}}>
				{new Array(user.displayedDays).fill(0).map((_, index) => (
					<DayColumn key={index} isLast={index === user.displayedDays - 1} />
				))}
			</div>
		</div>
	);
};

export default Grid;
