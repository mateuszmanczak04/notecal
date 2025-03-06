'use client';

import { MenubarLabel } from '@/components/menubar';
import { useSettings } from '@/hooks/use-settings';
import { Minus, Plus } from 'lucide-react';

const CalendarMenuZoom = () => {
	const { zoomIn, zoomOut } = useSettings();

	return (
		<>
			<MenubarLabel onClick={() => zoomOut()} className='data-[state=open]:bg-white'>
				<Minus className='size-5' />
			</MenubarLabel>
			<MenubarLabel onClick={() => zoomIn()} className='data-[state=open]:bg-white'>
				<Plus className='size-5' />
			</MenubarLabel>
		</>
	);
};

export default CalendarMenuZoom;
