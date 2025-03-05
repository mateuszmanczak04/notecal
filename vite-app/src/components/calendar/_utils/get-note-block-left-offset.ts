import { differenceInCalendarDays } from 'date-fns';

/**
 * Returns an offset from the grid left edge in pixels.
 * It's based on note's date.
 */
export const getNoteBlockLeftOffset = ({
	blockDay,
	displayedDays,
	firstCalendarDay,
	leftOffset,
}: {
	blockDay: Date;
	displayedDays: number;
	firstCalendarDay: Date;
	leftOffset: number;
}) => {
	const daysFromFirstDay = differenceInCalendarDays(blockDay, firstCalendarDay);
	return `calc(${daysFromFirstDay * (100 / displayedDays) + '%'} + ${leftOffset * 16 + 'px'})`;
};
