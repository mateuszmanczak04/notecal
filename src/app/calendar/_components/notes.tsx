'use client';

import { useAppContext } from '@/app/_components/app-context';
import { MouseEvent, useMemo, useOptimistic, useState, useTransition } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import CoursePicker from './course-picker';
import Note from './note';

const Notes = () => {
	const { notes } = useAppContext();
	const { containerRef, getRelativePosition, getDateFromPosition, rowHeight } = useCalendarContext();
	const [optimisticnotes, setOptimisticNotes] = useOptimistic(notes);
	const [isPending, startTransition] = useTransition();

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

	/**
	 * Handles optimistic updates in local state.
	 */
	const updateOptimisticNote = ({ id, startTime, endTime }: { id: string; startTime: Date; endTime: Date }) => {
		startTransition(() => {
			setOptimisticNotes(prev => {
				return prev.map(note => (note.id === id ? { ...note, startTime, endTime } : note));
			});
		});
	};

	return (
		<div
			onDragOver={e => e.preventDefault()}
			ref={containerRef}
			className='absolute left-12 top-0 w-[calc(100%-48px)] cursor-crosshair overflow-hidden sm:left-20 sm:w-[calc(100%-80px)]'
			onClick={handleClick}
			style={{ height: rowHeight * 24 + 'px' }}>
			{/* Notes */}
			{optimisticnotes?.map((note, index) => (
				<Note
					updateOptimisticNote={updateOptimisticNote}
					key={note.id}
					note={note}
					leftOffset={leftOffsets[index]}
				/>
			))}

			{/* A popup to create a new note */}
			{selectedTime && (
				<CoursePicker time={selectedTime} x={popupX} y={popupY} hidePicker={() => setSelectedTime(null)} />
			)}
		</div>
	);
};

export default Notes;
