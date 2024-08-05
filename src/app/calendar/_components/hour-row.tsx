'use client';

import { cn } from '@/lib/utils';
import { useCalendarContext } from '../_context/calendar-context';

const HourRow = ({ hour }: { hour: number }) => {
	const { rowHeight } = useCalendarContext();

	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center border-b border-l border-r font-semibold text-neutral-500 sm:flex-row',
				hour === 23 && 'rounded-bl-xl',
			)}
			style={{ height: rowHeight + 'px' }}>
			<span className='text-neutral-800 sm:text-neutral-500'>
				{hour.toString().padStart(2, '00')}{' '}
			</span>
			<span className='hidden sm:inline'>:</span>
			<span>00</span>
		</div>
	);
};

export default HourRow;
