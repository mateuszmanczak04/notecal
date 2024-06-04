'use client';

import { useCalendarContext } from '@/components/calendar/calendar-context';
import CreateNotePopup from '@/components/calendar/create-note-popup';
import useCourses from '@/hooks/use-courses';
import percentageToTime from '@/lib/percentage-to-time';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC, MouseEvent, useEffect, useRef, useState } from 'react';

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
		// todo - fix this value to stay fixed
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

	const currentlyDraggedNoteId = useRef<string | null>(null);
	const noteInsideYOffset = useRef<number | null>(null);

	const handleMouseMove = (e: MouseEvent) => {
		console.log(currentlyDraggedNoteId.current);
		// amount of pixels from the note's top edge
		// to the click point
		const gridTopOffset = 176; // todo - it is hardcoded for now
		// 176 is amount of pixels from top of the page to the grid
		const timePercentage = (e.nativeEvent.pageY - gridTopOffset) / (24 * 64);
		const { hours, minutes } = percentageToTime(timePercentage);
	};

	useEffect(() => {
		window.addEventListener('mousemove', e => handleMouseMove(e));

		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	// TODO - implement dragging detection

	const hh = (e: any) => {};

	return (
		<div
			ref={gridRef}
			className='relative flex-1 cursor-crosshair overflow-y-hidden border-r border-gray-300'>
			{new Array(23).fill(0).map((_, i) => (
				<GridRect key={i} hour={i} onClick={onClick} />
			))}
			<GridRect last hour={23} onClick={onClick} />
			{/* notes: */}
			{todayNotes.map(note => {
				const hour = note.startTime.getHours();
				const minute = note.startTime.getMinutes();
				const topTranslate = Math.floor((hour + minute / 60) * 64);
				return (
					<Link
						onMouseDown={(e: MouseEvent) => {
							currentlyDraggedNoteId.current = note.id;
							noteInsideYOffset.current =
								e.pageY -
								window.scrollY -
								e.currentTarget.getBoundingClientRect().y;
						}}
						href={
							note.id === newNoteTempId
								? '/notes'
								: `/notes/${note.courseId}/${note.id}`
						}
						className={cn(
							'absolute left-2 right-0 top-0 min-h-4 cursor-pointer select-none overflow-y-hidden rounded-md bg-blue-200 p-2 transition',
							note.id === newNoteTempId && 'pointer-events-none opacity-75',
						)}
						style={{
							transform: `translateY(${topTranslate}px)`,
							height:
								((note.endTime.getTime() - note.startTime.getTime()) /
									3600_000) *
									64 +
								'px',
						}}
						key={note.id}>
						{coursesData?.courses?.find(c => c.id === note.courseId)?.name ||
							'Unknown course'}
					</Link>
				);
			})}
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
