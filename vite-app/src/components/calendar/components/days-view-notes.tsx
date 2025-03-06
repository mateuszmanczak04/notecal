import { addDays, isAfter, isBefore, startOfDay } from 'date-fns';
import { AnimatePresence } from 'motion/react';
import { MouseEvent, RefObject, useMemo, useState } from 'react';
import LoadingSpinner from '../../../components/loading-spinner';
import { useNotesWithTime } from '../../../hooks/use-notes-with-time';
import { useSettings } from '../../../hooks/use-settings';
import { useCalendarContext } from '../context/calendar-context';
import { getCalendarRowHeight } from '../utils/get-calendar-row-height';
import { getNoteDateFromXYPosition } from '../utils/get-date-from-position';
import { getPositionRelativeToContainer } from '../utils/get-position-relative-to-container';
import DaysViewCoursePicker from './days-view-course-picker';
import DaysViewNote from './days-view-note';

const DaysViewNotes = () => {
	const { data: notes, isPending: isNotesPending } = useNotesWithTime();
	const { hiddenCoursesIds, daysViewContainerRef } = useCalendarContext();
	const [popupX, setPopupX] = useState(0);
	const [popupY, setPopupY] = useState(0);
	// When there is selected time, we should display the course picker:
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);
	const { zoomLevel, firstCalendarDay, displayedDays } = useSettings();

	/**
	 * Detect click on the grid and show popup to create a new note in that time.
	 */
	const handleClick = (event: MouseEvent) => {
		if (!daysViewContainerRef.current) return;

		// Don't react when user clicks on existing notes
		if (event.target !== daysViewContainerRef.current) return;

		const { x, y } = getPositionRelativeToContainer({
			x: event.clientX,
			y: event.clientY,
			container: daysViewContainerRef.current,
		});
		if (x === null || y === null) return;
		setPopupX(x);
		setPopupY(y);

		const time = getNoteDateFromXYPosition({
			x,
			y,
			container: daysViewContainerRef.current,
			firstCalendarDay,
			displayedDays,
		});
		setSelectedTime(time);
	};

	/**
	 * Calculates a left offset when there are multiple notes overlapping.
	 * First note is aligned to the left, second one a little to the right, third one even more to the right.
	 */
	const leftOffsets = useMemo(() => {
		if (!notes || notes.length === 0) return [];

		const results = new Array(notes.length).fill(0);
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

	if (isNotesPending)
		return (
			<div className='absolute left-12 top-0 w-[calc(100%-48px)] cursor-crosshair overflow-hidden sm:left-20 sm:w-[calc(100%-80px)]'>
				<div className='flex items-center gap-2 p-4'>
					<LoadingSpinner /> We are loading your notes...
				</div>
			</div>
		);

	return (
		<div
			onDragOver={e => e.preventDefault()}
			ref={daysViewContainerRef as RefObject<HTMLDivElement>}
			className='absolute left-12 top-0 w-[calc(100%-48px)] cursor-crosshair overflow-hidden sm:left-20 sm:w-[calc(100%-80px)]'
			onClick={handleClick}
			style={{ height: getCalendarRowHeight({ zoomLevel }) * 24 + 'px' }}
		>
			{/* Notes */}
			{notes &&
				notes
					.filter(n => !hiddenCoursesIds.includes(n.courseId))
					.filter(n => {
						// Optimization to render only notes from the currently visible date span
						if (isAfter(n.startTime, addDays(startOfDay(firstCalendarDay), displayedDays || 7))) return;
						if (isBefore(n.endTime, startOfDay(firstCalendarDay))) return;
						return n;
					})
					.map((note, index) => <DaysViewNote key={note.id} note={note} leftOffset={leftOffsets[index]} />)}

			{/* A popup to create a new note */}
			<AnimatePresence>
				{selectedTime && (
					<DaysViewCoursePicker
						time={selectedTime}
						x={popupX}
						y={popupY}
						hidePicker={() => setSelectedTime(null)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default DaysViewNotes;
