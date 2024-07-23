'use client';

import { cn } from '@/lib/utils';

const HourRow = ({ hour }: { hour: number }) => {
	return (
		<div
			className={cn(
				'flex h-calendar-row items-center justify-center border-b border-l border-r font-semibold text-gray-500',
				hour === 23 && 'rounded-bl-xl',
			)}>
			{hour.toString().padStart(2, '00')}:00
		</div>
	);
};

export default HourRow;
