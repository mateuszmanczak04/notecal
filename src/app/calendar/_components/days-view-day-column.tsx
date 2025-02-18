'use client';

import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/utils/cn';
import { getCalendarRowHeight } from '../_utils/get-calendar-row-height';

const Row = ({ isToday }: { isToday: boolean }) => {
	const { zoomLevel } = useSettings();

	return (
		<div
			className={cn(
				'flex items-center justify-center border-b border-r font-semibold text-neutral-500 transition-[height] dark:border-neutral-600',
				isToday && 'bg-neutral-100 dark:bg-neutral-700',
			)}
			style={{ height: getCalendarRowHeight({ zoomLevel }) + 'px' }}></div>
	);
};

type Props = {
	isToday?: boolean;
};

const DaysViewDayColumn = ({ isToday = false }: Props) => {
	return (
		<div className='grid'>
			{new Array(24).fill(0).map((_, index) => (
				<Row key={index} isToday={isToday} />
			))}
		</div>
	);
};

export default DaysViewDayColumn;
