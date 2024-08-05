'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { FC } from 'react';
import DayHeading from './day-heading';
import { useCalendarContext } from '../_context/calendar-context';

interface TopBarProps {}

const TopBar: FC<TopBarProps> = ({}) => {
	const { getDayAfter, displayedDays } = useCalendarContext();
	const days = new Array(displayedDays)
		.fill(0)
		.map((_, index) => getDayAfter(index));

	return (
		<div className='mt-4 flex'>
			<div className='h-calendar-header w-12 rounded-tl-xl border sm:w-20'></div>

			{/* Mon, Tue, Wed, etc.: */}
			<div
				className='grid flex-1'
				style={{ gridTemplateColumns: `repeat(${displayedDays}, 1fr)` }}>
				{days.map((day, index) => (
					<DayHeading
						key={day.toString()}
						date={day}
						isLast={index === displayedDays - 1}
					/>
				))}
			</div>
		</div>
	);
};

export default TopBar;
