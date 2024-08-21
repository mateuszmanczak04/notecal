'use client';

import { cn } from '@/lib/utils';
import { FC } from 'react';

interface DayHeadingProps {
	date: Date;
	isLast?: boolean;
}

const DayHeading: FC<DayHeadingProps> = ({ date, isLast }) => {
	const dayOfTheMonth = date.getDate();
	const dayOfTheWeek = date.toLocaleString('default', { weekday: 'short' });

	return (
		<div
			className={cn(
				'flex h-calendar-header items-center justify-center overflow-hidden text-nowrap border-b border-r border-t text-sm font-semibold text-neutral-500 dark:border-neutral-600 dark:text-neutral-400 sm:text-base',
				isLast && 'rounded-tr-xl',
			)}>
			{dayOfTheWeek} {dayOfTheMonth}
		</div>
	);
};

export default DayHeading;
