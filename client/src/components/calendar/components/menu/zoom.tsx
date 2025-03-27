import { Minus, Plus } from 'lucide-react';
import { useSettings } from '../../../../hooks/use-settings';
import { MenubarLabel } from '../../../menubar';

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
