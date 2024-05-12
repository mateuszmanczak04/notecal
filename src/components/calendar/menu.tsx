'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const CalendarMenu = () => {
	return (
		<div className='flex gap-2'>
			<Button size='sm' className='w-16'>
				<Plus className='h-full w-full' />
			</Button>
			<Button size='sm' variant='secondary' className='w-16'>
				<ChevronLeft className='h-full w-full' />
			</Button>
			<Button size='sm' variant='secondary' className='w-16'>
				<ChevronRight className='h-full w-full' />
			</Button>
		</div>
	);
};

export default CalendarMenu;
