/**
 * Returns height of the calendar hour row in pixels. It's based on user's setting "zoomLevel".
 */
export const getCalendarRowHeight = ({ zoomLevel }: { zoomLevel: number }) => {
	switch (zoomLevel) {
		case 1:
			return 40;
		case 2:
			return 60;
		case 3:
			return 80;
		case 4:
			return 120;
		case 5:
			return 160;
		default:
			return 80;
	}
};
