import { cn } from '@/lib/utils';
import { FC } from 'react';

const Row = ({ isLast }: { isLast: boolean }) => {
	return (
		<div
			className={cn(
				'flex h-calendar-row items-center justify-center border-b border-r font-semibold text-gray-500',
				isLast && 'rounded-br-xl',
			)}></div>
	);
};

interface DayColumnProps {
	date: Date;
	isLast?: boolean;
}

const DayColumn: FC<DayColumnProps> = ({ date, isLast = false }) => {
	const dayOfTheMonth = date.getDate();
	const dayOfTheWeek = date.toLocaleString('default', { weekday: 'short' });

	return (
		<div className='flex-1'>
			<div className='flex h-calendar-header items-center justify-center border-b border-r border-t font-semibold text-gray-500'>
				{dayOfTheWeek} {dayOfTheMonth}
			</div>
			{new Array(24).fill(0).map((_, index) => (
				<Row key={index} isLast={index === 23 && isLast} />
			))}
		</div>
	);
};

export default DayColumn;
