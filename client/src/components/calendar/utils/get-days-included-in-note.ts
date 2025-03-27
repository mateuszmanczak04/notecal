import { addDays, differenceInCalendarDays, startOfDay } from 'date-fns';

/**
 * Returns days which are included in note's duration,
 * all of them are set to 00:00.
 */
export const getDaysIncludedInNote = ({ noteStartTime, noteEndTime }: { noteStartTime: Date; noteEndTime: Date }) => {
	const durationInDays =
		differenceInCalendarDays(
			noteEndTime > noteStartTime ? noteEndTime : noteStartTime,
			noteEndTime > noteStartTime ? noteStartTime : noteEndTime,
		) + 1;
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
