import { addDays } from 'date-fns';

/**
 * Get day and time from relative position, round to 15 minutes.
 * Arguments passed here are usually results of "getRelativePosition()".
 */
export const getNoteDateFromXYPosition = ({
	x,
	y,
	displayedDays,
	container,
	firstCalendarDay,
}: {
	x: number;
	y: number;
	displayedDays: number;
	container: HTMLElement;
	firstCalendarDay: Date;
}) => {
	const { width, height } = container.getBoundingClientRect();

	// Get day (YYYY-MM-DD):
	const columnWidth = width / displayedDays;
	const dayIndex = Math.floor(x / columnWidth);
	const time = addDays(firstCalendarDay, dayIndex);

	// Get time (HH:MM):
	const yRatio = y / height;
	const minutesIn24H = 24 * 60;
	const totalMinutes = yRatio * minutesIn24H;
	const hours = Math.floor(totalMinutes / 60);
	const minutes = Math.round((totalMinutes % 60) / 15) * 15;
	time.setHours(hours);
	time.setMinutes(minutes);
	time.setSeconds(0);
	time.setMilliseconds(0);

	return time;
};
