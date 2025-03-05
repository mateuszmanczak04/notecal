/**
 * Returns a relative position to grid container (in pixels) and null when position is beyond the container.
 */
export const getPositionRelativeToContainer = ({
	x,
	y,
	container,
}: {
	x: number;
	y: number;
	container: HTMLElement;
}) => {
	const { x: containerLeft, y: containerTop, width, height } = container.getBoundingClientRect();

	const relativeX = x - containerLeft;
	const relativeY = y - containerTop;

	// Case when position is beyond the container bounding box
	if (relativeX < 0 || relativeY < 0 || relativeX > width || relativeY > height) {
		return { x: null, y: null };
	}

	return { x: relativeX, y: relativeY };
};
