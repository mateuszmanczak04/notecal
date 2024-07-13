'use client';

import { MouseEvent, useState } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import Note from './note';
import CoursePicker from './course-picker';
import useNotes from '@/app/notes/_hooks/use-notes';

const Notes = () => {
	const { notes } = useNotes();
	const { containerRef, getRelativePosition, getDateFromPosition } =
		useCalendarContext();

	const [popupX, setPopupX] = useState(0);
	const [popupY, setPopupY] = useState(0);
	// When there is selected time, we should display the course picker:
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);

	const handleClick = (event: MouseEvent) => {
		if (!containerRef.current) return;

		// Handle clicks on existing events:
		if (event.target !== containerRef.current) return;

		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return; // TODO: show some kind of message
		setPopupX(x);
		setPopupY(y);

		const time = getDateFromPosition(x, y);
		setSelectedTime(time);
	};

	return (
		// TODO: hard coded sizes and position - should be based
		// on tailwind variables describing grid sizes
		<div
			onDragOver={e => e.preventDefault()}
			ref={containerRef}
			className='absolute left-20 top-10 h-[calc(100%-40px)] w-[calc(100%-80px)] cursor-crosshair overflow-hidden'
			onClick={handleClick}>
			{notes?.map(note => <Note key={note.id} note={note} />)}
			{selectedTime && (
				<CoursePicker
					time={selectedTime}
					x={popupX}
					y={popupY}
					hidePicker={() => setSelectedTime(null)}
				/>
			)}
		</div>
	);
};

export default Notes;
