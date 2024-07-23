'use client';

import { cn } from '@/lib/utils';
import { useCalendarContext } from '../_context/calendar-context';

const HourRow = ({ hour }: { hour: number }) => {
	const { rowHeight } = useCalendarContext();

	return (
		<div
			className={cn(
				'flex items-center justify-center border-b border-l border-r font-semibold text-gray-500',
				hour === 23 && 'rounded-bl-xl',
			)}
			style={{ height: rowHeight + 'px' }}>
			{hour.toString().padStart(2, '00')}:00
		</div>
	);
};

export default HourRow;
