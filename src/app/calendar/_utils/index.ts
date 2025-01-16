import { addDays, differenceInCalendarDays, startOfDay } from 'date-fns';

/**
 * Returns days which are included in note's duration,
 * all of them are set to 00:00.
 */
export const getDaysIncludedInNote = ({ noteStartTime, noteEndTime }: { noteStartTime: Date; noteEndTime: Date }) => {
	const durationInDays = differenceInCalendarDays(noteEndTime, noteStartTime) + 1;
	const result = new Array(durationInDays)
		.fill(noteStartTime)
		.map((day, index) => {
			return startOfDay(addDays(day, index));
		})
		.filter((day, index) => {
			// If it's the last day:
			if (index === durationInDays - 1) {
				// And note ends at midnight:
				if (noteEndTime.getHours() === 0 && noteEndTime.getMinutes() === 0) {
					// Don't render that last day
					return null;
				}
			}
			return day;
		});

	return result;
};

/**
 * Returns an offset from the grid top edge in pixels.
 * It's based on the note's hour and minute.
 */
export const getNoteBlockTopOffset = ({ blockDay, noteStartTime }: { blockDay: Date; noteStartTime: Date }) => {
	// Check if it is not the first day of multi-day note:
	if (startOfDay(noteStartTime).getTime() !== blockDay.getTime()) {
		return 0;
	}

	const hours = noteStartTime.getHours();
	const minutes = noteStartTime.getMinutes();
	const totalMinutes = 60 * hours + minutes;
	const totalMinutesIn24h = 24 * 60;
	const ratio = totalMinutes / totalMinutesIn24h;
	return ratio * 100 + '%';
};

/**
 * Returns a height of the note block.
 * Remember that one Note can contain multiple blocks if it
 * spreads into many days.
 */
export const getNoteBlockHeight = ({
	blockDay,
	noteStartTime,
	noteEndTime,
}: {
	blockDay: Date;
	noteStartTime: Date;
	noteEndTime: Date;
}) => {
	// Note starts and ends the same day:
	if (startOfDay(noteStartTime).getTime() === startOfDay(noteEndTime).getTime()) {
		const startHours = noteStartTime.getHours();
		const startMinutes = noteStartTime.getMinutes();
		const totalStartMinutes = 60 * startHours + startMinutes;

		const endHours = noteEndTime.getHours();
		const endMinutes = noteEndTime.getMinutes();
		const totalEndMinutes = 60 * endHours + endMinutes;

		const totalDuration = totalEndMinutes - totalStartMinutes;
		const totalMinutesIn24h = 24 * 60;
		const ratio = totalDuration / totalMinutesIn24h;

		return ratio * 100 + '%';
	}

	// If it's the first day of multi-day note:
	if (startOfDay(noteStartTime).getTime() === blockDay.getTime()) {
		const startHours = noteStartTime.getHours();
		const startMinutes = noteStartTime.getMinutes();
		const totalStartMinutes = 60 * startHours + startMinutes;

		const totalMinutesIn24h = 24 * 60;
		const totalDuration = totalMinutesIn24h - totalStartMinutes;
		const ratio = totalDuration / totalMinutesIn24h;
		return ratio * 100 + '%';
	}

	// It's the last day of multi-day note:
	if (startOfDay(noteEndTime).getTime() === blockDay.getTime()) {
		const endHours = noteEndTime.getHours();
		const endMinutes = noteEndTime.getMinutes();

		const totalEndMinutes = 60 * endHours + endMinutes;
		const totalMinutesIn24h = 24 * 60;
		const ratio = totalEndMinutes / totalMinutesIn24h;
		return ratio * 100 + '%';
	}

	// It's the day in the middle of >=3 day long notes
	// (can't be last and first):
	return '100%';
};

/**
 * Returns an offset from the grid left edge in pixels.
 * It's based on note's date.
 */
export const getNoteBlockLeftOffset = ({
	blockDay,
	displayedDays,
	currentFirstDay,
	leftOffset,
}: {
	blockDay: Date;
	displayedDays: number;
	currentFirstDay: Date;
	leftOffset: number;
}) => {
	const daysFromFirstDay = differenceInCalendarDays(blockDay, currentFirstDay);
	return `calc(${daysFromFirstDay * (100 / displayedDays) + '%'} + ${leftOffset * 16 + 'px'})`;
};

/**
 * Returns a width of the note block in pixels. Simply divided
 * 1 / settings.displayedDays with some improvements.
 */
export const getNoteBlockWidth = ({ displayedDays }: { displayedDays: number }) => {
	return `calc(${100 / displayedDays}% - ${32 + 'px'})`;
};
