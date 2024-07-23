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
