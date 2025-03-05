'use client';

import { MenubarLabel } from '@/components/menubar';
import { useSettings } from '@/hooks/use-settings';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarMenuBackForward = () => {
	const { viewMode, goDayForward, goDayBackward, goMonthForward, goMonthBackward } = useSettings();

	const handleForward = () => {
		if (viewMode === 'days') {
			goDayForward();
		} else if (viewMode === 'month') {
			goMonthForward();
		}
	};

	const handleBackward = () => {
		if (viewMode === 'days') {
			goDayBackward();
		} else if (viewMode === 'month') {
			goMonthBackward();
		}
	};

	return (
		<>
			<MenubarLabel onClick={handleBackward} className='data-[state=open]:bg-white'>
				<ChevronLeft className='size-5' />
			</MenubarLabel>
			<MenubarLabel onClick={handleForward} className='data-[state=open]:bg-white'>
				<ChevronRight className='size-5' />
			</MenubarLabel>
		</>
	);
};

export default CalendarMenuBackForward;
