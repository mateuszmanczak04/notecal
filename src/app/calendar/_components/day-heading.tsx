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
				'flex h-calendar-header items-center justify-center border-b border-r border-t font-semibold text-gray-500',
				isLast && 'rounded-tr-xl',
			)}>
			{dayOfTheWeek} {dayOfTheMonth}
		</div>
	);
};

export default DayHeading;
