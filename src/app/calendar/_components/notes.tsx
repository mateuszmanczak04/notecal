'use client';

import { MouseEvent, useRef, useState } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import Note from './note';
import { AMOUNT_OF_DAYS } from './grid';
import { addDays } from 'date-fns';
import CoursePicker from './course-picker';
import useNotes from '@/app/notes/_hooks/use-notes';

const Notes = () => {
	const { notes } = useNotes();
	const { currentFirstDay, containerRef } = useCalendarContext();

	const [clickX, setClickX] = useState(0);
	const [clickY, setClickY] = useState(0);
	// When there is selected time, we should display the course picker:
	const [selectedTime, setSelectedTime] = useState<Date | null>(null);

	const handleClick = (event: MouseEvent) => {
		if (!containerRef.current) return;

		// Handle clicks on existing events:
		if (event.target !== containerRef.current) return;

		const {
			x: containerLeft,
			y: containerTop,
			width,
			height,
		} = containerRef.current.getBoundingClientRect();

		// Position relative to container
		const x = event.clientX - containerLeft;
		const y = event.clientY - containerTop;
		setClickX(x);
		setClickY(y);

		// Get day (YYYY-MM-DD):
		const columnWidth = width / AMOUNT_OF_DAYS;
		const dayIndex = Math.floor(x / columnWidth);
		const noteStartTime = addDays(currentFirstDay, dayIndex);

		// Get time (HH:MM):
		const yRatio = y / height;
		const minutesIn24H = 24 * 60;
		const totalMinutes = yRatio * minutesIn24H;
		const hours = Math.floor(totalMinutes / 60);
		const minutes = Math.round((totalMinutes % 60) / 15) * 15;
		noteStartTime.setHours(hours);
		noteStartTime.setMinutes(minutes);

		setSelectedTime(noteStartTime);
	};

	return (
		// TODO: hard coded sizes and position - should be based
		// on tailwind variables describin grid sizes
		<div
			ref={containerRef}
			className='absolute left-20 top-10 h-[calc(100%-40px)] w-[calc(100%-80px)] cursor-crosshair overflow-hidden'
			onClick={handleClick}>
			{notes?.map(note => <Note key={note.id} note={note} />)}
			{selectedTime && (
				<CoursePicker
					time={selectedTime}
					x={clickX}
					y={clickY}
					hidePicker={() => setSelectedTime(null)}
				/>
			)}
		</div>
	);
};

export default Notes;
