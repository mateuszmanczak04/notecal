'use client';

import { cn } from '@/lib/utils';
import { FC } from 'react';
import { useCalendarContext } from '../_context/calendar-context';

const Row = ({ isLast }: { isLast: boolean }) => {
	const { rowHeight } = useCalendarContext();

	return (
		<div
			className={cn(
				'flex items-center justify-center border-b border-r font-semibold text-neutral-500',
				isLast && 'rounded-br-xl',
			)}
			style={{ height: rowHeight + 'px' }}></div>
	);
};

interface DayColumnProps {
	isLast?: boolean;
}

const DayColumn: FC<DayColumnProps> = ({ isLast = false }) => {
	return (
		<div className='grid'>
			{new Array(24).fill(0).map((_, index) => (
				<Row key={index} isLast={index === 23 && isLast} />
			))}
		</div>
	);
};

export default DayColumn;
