'use client';

import { useCalendarContext } from '@/components/calendar/calendar-context';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarMenu = () => {
	const { goDayBackward, goDayForward } = useCalendarContext();

	return (
		<div className='flex gap-2'>
			<Button size='sm' className='w-16'>
				<Plus className='h-full w-full' />
			</Button>
			<Button
				size='sm'
				variant='secondary'
				className='w-16'
				onClick={goDayBackward}>
				<ChevronLeft className='h-full w-full' />
			</Button>
			<Button
				size='sm'
				variant='secondary'
				className='w-16'
				onClick={goDayForward}>
				<ChevronRight className='h-full w-full' />
			</Button>
		</div>
	);
};

export default CalendarMenu;
