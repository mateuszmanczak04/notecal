'use client';

import { useCalendarContext } from '@/components/calendar/calendar-context';
import useCourses from '@/hooks/use-courses';
import { FC, MouseEvent, useRef, useState } from 'react';
import CreateNotePopup from './create-note-popup';

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
	const { notes, addNewNote } = useCalendarContext();
	const { data: coursesData } = useCourses();
	const gridRef = useRef<HTMLDivElement | null>(null);
	const [showPopup, setShowPopup] = useState<boolean>(false);
	const [startTime, setStartTime] = useState<Date>(new Date());

	const todayNotes = notes.filter(note => {
		const startTime = note.startTime;
		return startTime.toDateString() === date.toDateString();
	});

	const onClick = (e: MouseEvent<HTMLDivElement>) => {
		const startTime = new Date(date);
		const hours = parseInt(e.currentTarget.getAttribute('data-hour') || '0');
		const minutesPercentage = ((e.nativeEvent.layerY + 40) % 64) / 64;
		let minutes = Math.floor(minutesPercentage * 60);
		minutes = minutes - (minutes % 15);
		startTime.setHours(hours);
		startTime.setMinutes(minutes);
		startTime.setSeconds(0);
		startTime.setMilliseconds(0);
		setStartTime(startTime);
		setShowPopup(true);
	};

	return (
		<div
			ref={gridRef}
			className='relative flex-1 cursor-crosshair border-r border-gray-300'>
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
					<div
						className='absolute left-2 right-0 top-0 h-16 cursor-pointer select-none overflow-y-hidden rounded-md bg-blue-500 bg-opacity-10 p-2'
						style={{ transform: `translateY(${topTranslate}px)` }}
						key={note.id}>
						{coursesData?.courses?.find(c => c.id === note.courseId)?.name ||
							'Unknown course'}
					</div>
				);
			})}
			<CreateNotePopup
				show={showPopup}
				clickX={100}
				clickY={100}
				submit={(courseId: string) => {
					addNewNote({
						courseId,
						content: 'Empty note',
						startTime,
					});
					setShowPopup(false);
				}}
			/>
		</div>
	);
};

export default CalendarDayGrid;
