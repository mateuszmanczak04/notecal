'use client';

import { useCalendarContext } from '../_context/calendar-context';
import CreateNotePopup from './create-note-popup';
import { FC, MouseEvent, useRef, useState } from 'react';

interface CalendarDayGridProps {
	date: Date;
}

const CalendarDayGrid: FC<CalendarDayGridProps> = ({ date }) => {
	const { notes, addNewNote, newNoteTempId } = useCalendarContext();
	const gridRef = useRef<HTMLDivElement | null>(null);
	const [startTime, setStartTime] = useState<Date>(new Date());

	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [clickPosition, setClickPosition] = useState<{ x: number; y: number }>({
		x: 0,
		y: 0,
	});

	const todayNotes = notes.filter(note => {
		const startTime = note.startTime;
		return startTime.toDateString() === date.toDateString();
	});

	const cancelNewNoteCreation = () => {
		setClickPosition({ x: 0, y: 0 });
		setShowPopup(false);
	};

	const onClick = (e: MouseEvent<HTMLDivElement>) => {
		const startTime = new Date(date);
		const hours = parseInt(e.currentTarget.getAttribute('data-hour') || '0');
		const gridTopOffset = gridRef.current?.getBoundingClientRect().top || 0;
		const minutesPercentage = ((e.nativeEvent.pageY - gridTopOffset) % 64) / 64;
		let minutes = Math.floor(minutesPercentage * 60);
		minutes = minutes - (minutes % 15);
		startTime.setHours(hours);
		startTime.setMinutes(minutes);
		startTime.setSeconds(0);
		startTime.setMilliseconds(0);
		setStartTime(startTime);
		setShowPopup(true);
		setClickPosition({ x: e.clientX, y: e.clientY });
	};

	return (
		<div
			ref={gridRef}
			className='border-accent relative flex-1 cursor-crosshair overflow-y-hidden border-r-2'>
			{showPopup && (
				<CreateNotePopup
					clickX={clickPosition.x}
					clickY={clickPosition.y}
					submit={(courseId: string) => {
						addNewNote({
							courseId,
							content: 'Empty note',
							startTime,
						});
						setShowPopup(false);
					}}
					hide={cancelNewNoteCreation}
				/>
			)}
		</div>
	);
};

export default CalendarDayGrid;
