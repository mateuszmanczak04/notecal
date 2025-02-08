/**
 * Returns height of the calendar hour row in pixels. It's based on user's setting "zoomLevel".
 */
export const getCalendarRowHeight = ({ zoomLevel }: { zoomLevel: number }) => {
	return zoomLevel * 40;
};
