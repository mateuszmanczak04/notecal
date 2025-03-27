/**
 * Returns a width of the note block in pixels. Simply divided
 * 1 / settings.displayedDays with some improvements.
 */
export const getNoteBlockWidth = ({ displayedDays }: { displayedDays: number }) => {
	return `calc(${100 / displayedDays}% - ${32 + 'px'})`;
};
