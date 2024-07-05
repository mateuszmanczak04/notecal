'use client';

import { useCalendarContext } from '@/components/calendar/calendar-context';
import CreateNotePopup from '@/components/calendar/create-note-popup';
import { FC, MouseEvent, useRef, useState } from 'react';
import CalendarNoteBlock from '@/components/calendar/calendar-note-block';
import CalendarDayGridRect from '@/components/calendar/calendar-day-grid-rect';

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
			className='relative flex-1 cursor-crosshair overflow-y-hidden border-r-2 border-accent'>
			{new Array(23).fill(0).map((_, i) => (
				<CalendarDayGridRect key={i} hour={i} onClick={onClick} />
			))}
			<CalendarDayGridRect last hour={23} onClick={onClick} />
			{/* notes: */}
			{todayNotes.map(note => (
				<CalendarNoteBlock
					id={note.id}
					courseId={note.courseId}
					endTime={note.endTime}
					newNoteTempId={newNoteTempId}
					startTime={note.startTime}
					key={note.id}
				/>
			))}
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
