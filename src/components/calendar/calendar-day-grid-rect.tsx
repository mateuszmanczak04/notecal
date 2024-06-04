import { MouseEvent } from 'react';

const CalendarDayGridRect = ({
	last = false,
	hour,
	onClick,
}: {
	last?: boolean;
	hour: number;
	onClick: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
	if (last)
		return (
			<div
				className='h-16 w-full border-y border-gray-300'
				data-hour={hour}
				onClick={onClick}></div>
		);
	return (
		<div
			className='h-16 w-full border-t border-gray-300'
			data-hour={hour}
			onClick={onClick}></div>
	);
};

export default CalendarDayGridRect;
