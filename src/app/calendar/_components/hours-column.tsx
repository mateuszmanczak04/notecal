'use client';

import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCalendarContext } from '../_context/calendar-context';

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
	const { goDayBackward, goDayForward } = useCalendarContext();

	return (
		<div className='w-20'>
			<div className='flex h-calendar-header font-semibold'>
				<button
					className='flex flex-1 cursor-pointer items-center justify-center rounded-tl-xl border hover:bg-gray-100'
					onClick={goDayBackward}>
					<ChevronLeft className='h-5 w-5' />
				</button>
				<button
					className='flex flex-1 cursor-pointer items-center justify-center border-b border-r border-t hover:bg-gray-100'
					onClick={goDayForward}>
					<ChevronRight className='h-5 w-5' />
				</button>
			</div>
			{new Array(24).fill(0).map((_, index) => (
				<Row key={index} hour={index} />
			))}
		</div>
	);
};

export default HoursColumn;
