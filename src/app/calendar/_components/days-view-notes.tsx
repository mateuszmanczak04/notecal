'use client';

import { useNotes } from '@/hooks/use-notes';
import { useUser } from '@/hooks/use-user';
import { addDays } from 'date-fns';
import { MouseEvent, useMemo, useState } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import DaysViewCoursePicker from './days-view-course-picker';
import DaysViewNote from './days-view-note';

const DaysViewNotes = () => {
	const { data: notes } = useNotes();
	const { containerRef, getRelativePosition, getDateFromPosition, rowHeight, currentFirstDay } = useCalendarContext();
	const { data: user } = useUser();
	const { hiddenCoursesIds } = useCalendarContext();
	const [popupX, setPopupX] = useState(0);
	const [popupY, setPopupY] = useState(0);
	// When there is selected time, we should display the course picker:
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);

	/**
	 * Detect click on the grid and show popup to create a new note in that time.
	 */
	const handleClick = (event: MouseEvent) => {
		if (!containerRef.current) return;

		// Don't react when user clicks on existing notes
		if (event.target !== containerRef.current) return;

		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return;
		setPopupX(x);
		setPopupY(y);

		const time = getDateFromPosition(x, y);
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

	return (
		<div
			onDragOver={e => e.preventDefault()}
			ref={containerRef}
			className='absolute left-12 top-0 w-[calc(100%-48px)] cursor-crosshair overflow-hidden sm:left-20 sm:w-[calc(100%-80px)]'
			onClick={handleClick}
			style={{ height: rowHeight * 24 + 'px' }}>
			{/* Notes */}
			{notes &&
				notes
					.filter(n => !hiddenCoursesIds.includes(n.courseId))
					.filter(n => {
						// Optimization to render only notes from the currently visible date span
						if (n.endTime < currentFirstDay) return;
						if (n.startTime > addDays(currentFirstDay, user?.displayedDays || 0)) return;
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
