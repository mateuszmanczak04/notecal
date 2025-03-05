import { startOfDay } from 'date-fns';

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
