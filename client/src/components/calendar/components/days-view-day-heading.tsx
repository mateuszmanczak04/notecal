import { isToday } from 'date-fns';
import { cn } from '../../../utils/cn';

type Props = {
	date: Date;
};

const DaysViewDayHeading = ({ date }: Props) => {
	const dayOfTheMonth = date.getDate();
	const dayOfTheWeek = date.toLocaleString('default', { weekday: 'short' });

	return (
		<div
			className={cn(
				'flex h-10 select-none items-center justify-center overflow-hidden truncate text-nowrap border-b border-r border-t border-neutral-300 text-xs font-semibold text-neutral-500 dark:border-neutral-600 dark:text-neutral-400',
				isToday(date) && 'bg-neutral-200 dark:bg-neutral-800',
			)}>
			{dayOfTheWeek} {dayOfTheMonth} {isToday(date) && '(today)'}
		</div>
	);
};

export default DaysViewDayHeading;
