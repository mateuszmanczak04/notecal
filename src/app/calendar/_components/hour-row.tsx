'use client';

import { useUser } from '@/hooks/use-user';
import { cn } from '@/utils/cn';
import { getCalendarRowHeight } from '../_utils/get-calendar-row-height';

const HourRow = ({ hour }: { hour: number }) => {
	const { data: user } = useUser();

	if (!user) return;

	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center border-b border-l border-r font-semibold text-neutral-500 transition-[height] sm:flex-row dark:border-neutral-600 dark:text-neutral-400',
				hour === 23 && 'rounded-bl-xl',
			)}
			style={{ height: getCalendarRowHeight({ zoomLevel: user.zoomLevel }) + 'px' }}>
			<span className=''>{hour.toString().padStart(2, '00')} </span>
			<span className='hidden sm:inline'>:00</span>
		</div>
	);
};

export default HourRow;
