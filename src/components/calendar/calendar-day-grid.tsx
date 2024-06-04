'use client';

import { useCalendarContext } from '@/components/calendar/calendar-context';
import CreateNotePopup from '@/components/calendar/create-note-popup';
import useCourses from '@/hooks/use-courses';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC, MouseEvent, useRef, useState } from 'react';
import CalendarNoteBlock from './calendar-note-block';

interface CalendarDayGridProps {
	date: Date;
}

const GridRect = ({
	last = false,
	hour,
	onClick,
}: {
	last?: boolean;
	hour: number;
	onClick: (e: MouseEvent<HTMLDivElement>) => void;
}) => {
	if (last)
		return (
			<div
				className='h-16 w-full border-y border-gray-300'
				data-hour={hour}
				onClick={onClick}></div>
		);
	return (
		<div
			className='h-16 w-full border-t border-gray-300'
			data-hour={hour}
			onClick={onClick}></div>
	);
};

const CalendarDayGrid: FC<CalendarDayGridProps> = ({ date }) => {
	const { notes, addNewNote, newNoteTempId } = useCalendarContext();
	const { data: coursesData } = useCourses();
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
			className='relative flex-1 cursor-crosshair overflow-y-hidden border-r border-gray-300'>
			{new Array(23).fill(0).map((_, i) => (
				<GridRect key={i} hour={i} onClick={onClick} />
			))}
			<GridRect last hour={23} onClick={onClick} />
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
