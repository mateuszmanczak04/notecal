import { useSettings } from '../../../hooks/use-settings';
import { getCalendarRowHeight } from '../utils/get-calendar-row-height';

const HourRow = ({ hour }: { hour: number }) => {
	const { zoomLevel } = useSettings();

	return (
		<div
			className='flex flex-col items-center justify-center border-b border-l border-r font-semibold text-neutral-500 transition-[height] sm:flex-row dark:border-neutral-600 dark:text-neutral-400'
			style={{ height: getCalendarRowHeight({ zoomLevel }) + 'px' }}>
			<span className=''>{hour.toString().padStart(2, '00')} </span>
			<span className='hidden sm:inline'>:00</span>
		</div>
	);
};

export default HourRow;
