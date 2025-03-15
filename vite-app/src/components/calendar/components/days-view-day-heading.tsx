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
				'flex h-10 items-center justify-center overflow-hidden border-t border-r border-b border-neutral-300 text-sm font-semibold text-nowrap text-neutral-500 select-none sm:text-base dark:border-neutral-600 dark:text-neutral-400',
				isToday(date) && 'bg-neutral-200 dark:bg-neutral-800',
			)}>
			{dayOfTheWeek} {dayOfTheMonth} {isToday(date) && '(today)'}
		</div>
	);
};

export default DaysViewDayHeading;
