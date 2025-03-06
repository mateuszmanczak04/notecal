import { startOfDay } from 'date-fns';

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
