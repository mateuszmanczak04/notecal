'use client';

import { cn } from '@/utils/cn';
import { useCalendarContext } from '../_context/calendar-context';
import { getCalendarRowHeight } from '../_utils/get-calendar-row-height';

const Row = ({ isLast }: { isLast: boolean }) => {
	const { zoomLevel } = useCalendarContext();

	return (
		<div
			className={cn(
				'flex items-center justify-center border-b border-r font-semibold text-neutral-500 transition-[height] dark:border-neutral-600',
				isLast && 'rounded-br-xl',
			)}
			style={{ height: getCalendarRowHeight({ zoomLevel }) + 'px' }}></div>
	);
};

type Props = {
	isLast?: boolean;
};

const DaysViewDayColumn = ({ isLast = false }: Props) => {
	return (
		<div className='grid'>
			{new Array(24).fill(0).map((_, index) => (
				<Row key={index} isLast={index === 23 && isLast} />
			))}
		</div>
	);
};

export default DaysViewDayColumn;
