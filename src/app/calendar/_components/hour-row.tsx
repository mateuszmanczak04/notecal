'use client';

import { cn } from '@/lib/utils';
import { useCalendarContext } from '../_context/calendar-context';

const HourRow = ({ hour }: { hour: number }) => {
	const { rowHeight } = useCalendarContext();

	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center border-b border-l border-r font-semibold text-neutral-500 transition-[height] dark:border-neutral-600 dark:text-neutral-400 sm:flex-row',
				hour === 23 && 'rounded-bl-xl',
			)}
			style={{ height: rowHeight + 'px' }}>
			<span className=''>{hour.toString().padStart(2, '00')} </span>
			<span className='hidden sm:inline'>:00</span>
		</div>
	);
};

export default HourRow;
