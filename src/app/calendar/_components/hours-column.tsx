import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Row = ({ hour }: { hour: number }) => {
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

const HoursColumn = () => {
	return (
		<div className='w-20'>
			<div className='flex h-calendar-header font-semibold'>
				<div className='flex flex-1 cursor-pointer items-center justify-center rounded-tl-xl border hover:bg-gray-100'>
					<ChevronLeft className='h-5 w-5' />
				</div>
				<div className='flex flex-1 cursor-pointer items-center justify-center border-b border-r border-t hover:bg-gray-100'>
					<ChevronRight className='h-5 w-5' />
				</div>
			</div>
			{new Array(24).fill(0).map((_, index) => (
				<Row key={index} hour={index} />
			))}
		</div>
	);
};

export default HoursColumn;
