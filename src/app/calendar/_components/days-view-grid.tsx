'use client';

import { useSettings } from '@/hooks/use-settings';
import { addDays, isSameDay } from 'date-fns';
import DaysViewDayColumn from './days-view-day-column';
import HourRow from './hour-row';

const DaysViewGrid = () => {
	const { displayedDays, firstCalendarDay } = useSettings();

	return (
		<div className='flex'>
			{/* Hours: */}
			<div className='w-12 text-sm sm:w-20 sm:text-base '>
				{new Array(24).fill(0).map((_, index) => (
					<HourRow key={index} hour={index} />
				))}
			</div>

			{/* Empty grid: */}
			<div className='relative flex-1'>
				<div
					className='absolute left-0 top-0 -z-10 -translate-x-full '
					style={{ width: `${(1 / displayedDays) * 100}%` }}>
					{/* Day before (hidden) */}
					<DaysViewDayColumn isToday={false} />
				</div>
				<div
					className='grid flex-1 '
					style={{
						gridTemplateColumns: `repeat(${displayedDays}, 1fr)`,
					}}>
					{new Array(displayedDays).fill(0).map((_, index) => (
						<DaysViewDayColumn
							key={index}
							isToday={isSameDay(addDays(firstCalendarDay, index), new Date())}
						/>
					))}
				</div>
				<div
					className='absolute right-0 top-0 -z-10 translate-x-full'
					style={{ width: `${(1 / displayedDays) * 100}%` }}>
					{/* Day after (hidden) */}
					<DaysViewDayColumn isToday={false} />
				</div>
			</div>
		</div>
	);
};

export default DaysViewGrid;
