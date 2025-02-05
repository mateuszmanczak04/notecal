'use client';

import { cn } from '@/utils/cn';
import { isToday } from 'date-fns';

type Props = {
	date: Date;
};

const DaysViewDayHeading = ({ date }: Props) => {
	const dayOfTheMonth = date.getDate();
	const dayOfTheWeek = date.toLocaleString('default', { weekday: 'short' });

	return (
		<div
			className={cn(
				'flex h-calendar-header items-center justify-center overflow-hidden text-nowrap border-b border-r border-t text-sm font-semibold text-neutral-500 sm:text-base dark:border-neutral-600 dark:text-neutral-400',
				isToday(date) && 'bg-neutral-200 dark:bg-neutral-800',
			)}>
			{dayOfTheWeek} {dayOfTheMonth}
		</div>
	);
};

export default DaysViewDayHeading;
