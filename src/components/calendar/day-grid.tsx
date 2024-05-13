'use client';

import { useCalendarContext } from '@/components/calendar/calendar-context';
import { FC, MouseEvent } from 'react';

interface CalendarDayGridProps {
	date: Date;
}

const GridRect = ({ last = false }: { last?: boolean }) => {
	if (last) return <div className='h-16 w-full border-y border-gray-300'></div>;
	return <div className='h-16 w-full border-t border-gray-300'></div>;
};

const CalendarDayGrid: FC<CalendarDayGridProps> = ({ date }) => {
	const { notes, addNewNote } = useCalendarContext();

	const todayNotes = notes.filter(note => {
		const startTime = note.startTime;
		return startTime.toDateString() === date.toDateString();
	});

	const onAddNewNote = (e: MouseEvent<HTMLDivElement>) => {
		const startTime = new Date(date);
		const hoursPercentage = (e.nativeEvent.layerY + 40) / 1536;
		const hours = Math.floor(hoursPercentage * 24);
		const minutesPercentage = ((e.nativeEvent.layerY + 40) % 64) / 64;
		const minutes = Math.floor(minutesPercentage * 60);
		startTime.setHours(hours);
		startTime.setMinutes(minutes);
		startTime.setSeconds(0);
		startTime.setMilliseconds(0);

		// todo - get courseId and content from popup
		addNewNote({
			courseId: 'clvcjwkjv0001xjrzuz9lbfxy',
			content: 'Testowa notatka hard coded',
			startTime,
		});
	};

	return (
		<div
			className='relative flex-1 cursor-crosshair border-r border-gray-300'
			onClick={onAddNewNote}>
			{new Array(23).fill(0).map((_, i) => (
				<GridRect key={i} />
			))}
			<GridRect last />
			{/* notes: */}
			{todayNotes.map(note => {
				const hour = note.startTime.getHours();
				const minute = note.startTime.getMinutes();
				const topTranslate = Math.floor((hour + minute / 60) * 64);
				return (
					<div
						className='absolute left-1 right-1 top-0 h-16 cursor-pointer select-none overflow-y-hidden rounded-md bg-blue-500 bg-opacity-10 p-2'
						style={{ transform: `translateY(${topTranslate}px)` }}
						key={note.id}>
						{note.content}
					</div>
				);
			})}
		</div>
	);
};

export default CalendarDayGrid;
