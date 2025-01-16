'use client';

import { useNotesWithTime } from '@/hooks/use-notes-with-time';
import { useSettings } from '@/hooks/use-settings';
import { useUser } from '@/hooks/use-user';
import { addDays, isAfter, isBefore, startOfDay } from 'date-fns';
import { MouseEvent, RefObject, useMemo, useState } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import { getCalendarRowHeight } from '../_utils/get-calendar-row-height';
import { getNoteDateFromXYPosition } from '../_utils/get-date-from-position';
import { getPositionRelativeToContainer } from '../_utils/get-position-relative-to-container';
import DaysViewCoursePicker from './days-view-course-picker';
import DaysViewNote from './days-view-note';

const DaysViewNotes = () => {
	const { data: notes } = useNotesWithTime();
	const { data: user } = useUser();
	const { hiddenCoursesIds, containerRef } = useCalendarContext();
	const [popupX, setPopupX] = useState(0);
	const [popupY, setPopupY] = useState(0);
	// When there is selected time, we should display the course picker:
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);
	const { zoomLevel, firstCalendarDay } = useSettings();

	/**
	 * Detect click on the grid and show popup to create a new note in that time.
	 */
	const handleClick = (event: MouseEvent) => {
		if (!containerRef.current || !user) return;

		// Don't react when user clicks on existing notes
		if (event.target !== containerRef.current) return;

		const { x, y } = getPositionRelativeToContainer({
			x: event.clientX,
			y: event.clientY,
			container: containerRef.current,
		});
		if (x === null || y === null) return;
		setPopupX(x);
		setPopupY(y);

		const time = getNoteDateFromXYPosition({
			x,
			y,
			container: containerRef.current,
			firstCalendarDay,
			displayedDays: user.displayedDays,
		});
		setSelectedTime(time);
	};

	/**
	 * Calculates a left offset when there are multiple notes overlapping.
	 * First note is aligned to the left, second one a little to the right, third one even more to the right.
	 */
	const leftOffsets = useMemo(() => {
		if (!notes || notes.length === 0) return [];

		let results = new Array(notes.length).fill(0);
		for (let i = 0; i < notes?.length; i++) {
			for (let j = 0; j < i; j++) {
				if (
					notes[j].endTime > notes[i].startTime &&
					notes[j].startTime <= notes[i].startTime &&
					notes[j].id !== notes[i].id
				) {
					results[i] = results[i - 1] + 1;
				}

				for (let k = results[j]; k >= 3; k--) {
					if (notes[j - k].endTime <= notes[i].startTime || notes[j - k].startTime > notes[i].startTime) {
						results[i] = 0;
					}
				}
			}
		}

		return results.map(r => (r > 2 ? 2 : r));
	}, [notes]);

	if (!user) return;

	return (
		<div
			onDragOver={e => e.preventDefault()}
			ref={containerRef as RefObject<HTMLDivElement>}
			className='absolute left-12 top-0 w-[calc(100%-48px)] cursor-crosshair overflow-hidden sm:left-20 sm:w-[calc(100%-80px)]'
			onClick={handleClick}
			style={{ height: getCalendarRowHeight({ zoomLevel }) * 24 + 'px' }}>
			{/* Notes */}
			{notes &&
				notes
					.filter(n => !hiddenCoursesIds.includes(n.courseId))
					.filter(n => {
						// Optimization to render only notes from the currently visible date span
						if (isAfter(n.startTime, addDays(startOfDay(firstCalendarDay), user?.displayedDays || 7)))
							return;
						if (isBefore(n.endTime, startOfDay(firstCalendarDay))) return;
						return n;
					})
					.map((note, index) => <DaysViewNote key={note.id} note={note} leftOffset={leftOffsets[index]} />)}

			{/* A popup to create a new note */}
			{selectedTime && (
				<DaysViewCoursePicker
					time={selectedTime}
					x={popupX}
					y={popupY}
					hidePicker={() => setSelectedTime(null)}
				/>
			)}
		</div>
	);
};

export default DaysViewNotes;
