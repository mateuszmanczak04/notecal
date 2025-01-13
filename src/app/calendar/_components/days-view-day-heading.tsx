'use client';

import { cn } from '@/utils/cn';

type Props = {
	date: Date;
	isLast?: boolean;
};

const DaysViewDayHeading = ({ date, isLast }: Props) => {
	const dayOfTheMonth = date.getDate();
	const dayOfTheWeek = date.toLocaleString('default', { weekday: 'short' });

	return (
		<div
			className={cn(
				'flex h-calendar-header items-center justify-center overflow-hidden text-nowrap border-b border-r border-t text-sm font-semibold text-neutral-500 sm:text-base dark:border-neutral-600 dark:text-neutral-400',
				isLast && 'rounded-tr-xl',
			)}>
			{dayOfTheWeek} {dayOfTheMonth}
		</div>
	);
};

export default DaysViewDayHeading;
