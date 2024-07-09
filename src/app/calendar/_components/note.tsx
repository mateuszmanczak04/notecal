'use client';

import { type Note } from '@prisma/client';
import { DragEventHandler, FC, useRef } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import { addDays, differenceInCalendarDays, startOfDay } from 'date-fns';
import Link from 'next/link';
import useCourse from '@/app/courses/_hooks/use-course';

interface NoteProps {
	note: Note;
}

const Note: FC<NoteProps> = ({ note }) => {
	const { currentFirstDay, daysToSee } = useCalendarContext();
	const course = useCourse(note.courseId);
	const topEdgeRef = useRef<HTMLDivElement | null>(null);
	const bottomEdgeRef = useRef<HTMLDivElement | null>(null);

	const blockWidth = (100 / daysToSee) * 0.9 + '%';

	const durationInDays =
		differenceInCalendarDays(note.endTime, note.startTime) + 1;

	// Days which are included in note's duration,
	// All of them are set to 00:00:
	const includedDays: Date[] = new Array(durationInDays)
		.fill(note.startTime)
		.map((day, index) => {
			return startOfDay(addDays(day, index));
		})
		.filter((day, index) => {
			// If it's the last day:
			if (index === durationInDays - 1) {
				// And note ends at midnight:
				if (startOfDay(note.endTime).getTime() === note.endTime.getTime()) {
					// Don't render that last day
					return null;
				}
			}
			return day;
		});

	const getLeftOffset = (date: Date) => {
		const daysFromFirstDay = differenceInCalendarDays(date, currentFirstDay);
		return daysFromFirstDay * (100 / daysToSee) + '%';
	};

	const getTopOffset = (date: Date) => {
		// Check if it is not the first day of multi-day note:
		if (startOfDay(note.startTime).getTime() !== date.getTime()) {
			return 0;
		}

		const hours = note.startTime.getHours();
		const minutes = note.startTime.getMinutes();
		const totalMinutes = 60 * hours + minutes;
		const totalMinutesIn24h = 24 * 60;
		const ratio = totalMinutes / totalMinutesIn24h;
		return ratio * 100 + '%';
	};

	const getHeight = (date: Date) => {
		// Note starts and ends the same day:
		if (
			startOfDay(note.startTime).getTime() ===
			startOfDay(note.endTime).getTime()
		) {
			const startHours = note.startTime.getHours();
			const startMinutes = note.startTime.getMinutes();
			const totalStartMinutes = 60 * startHours + startMinutes;

			const endHours = note.endTime.getHours();
			const endMinutes = note.endTime.getMinutes();
			const totalEndMinutes = 60 * endHours + endMinutes;

			const totalDuration = totalEndMinutes - totalStartMinutes;
			const totalMinutesIn24h = 24 * 60;
			const ratio = totalDuration / totalMinutesIn24h;
			return ratio * 100 + '%';
		}

		// If it's the first day of multi-day note:
		if (startOfDay(note.startTime).getTime() === date.getTime()) {
			const startHours = note.startTime.getHours();
			const startMinutes = note.startTime.getMinutes();
			const totalStartMinutes = 60 * startHours + startMinutes;

			const totalMinutesIn24h = 24 * 60;
			const totalDuration = totalMinutesIn24h - totalStartMinutes;
			const ratio = totalDuration / totalMinutesIn24h;
			return ratio * 100 + '%';
		}

		// It's the last day of multi-day note:
		if (startOfDay(note.endTime).getTime() === date.getTime()) {
			const endHours = note.endTime.getHours();
			const endMinutes = note.endTime.getMinutes();

			const totalEndMinutes = 60 * endHours + endMinutes;
			const totalMinutesIn24h = 24 * 60;
			const ratio = totalEndMinutes / totalMinutesIn24h;
			return ratio * 100 + '%';
		}

		// It's the day in the middle of >=3 day long notes
		// (can't be last and first):
		return '100%';
	};

	// Dragging edges
	const handleDragStartTop = (event: React.DragEvent) => {
		console.log('drag start');
	};

	const handleDragTop = (event: React.DragEvent) => {
		console.log('drag');
		const x = event.clientX;
		console.log(x);
	};

	const handleDragEndTop = (event: React.DragEvent) => {
		console.log('drag end');
	};

	return (
		<>
			{includedDays?.length > 0 &&
				includedDays.map(day => (
					<Link
						key={day.toString()}
						href={`/notes/${note.courseId}/${note.id}`}
						className='absolute z-20 select-none rounded-xl bg-primary-500 p-4 text-white transition hover:opacity-90'
						style={{
							top: getTopOffset(day),
							left: getLeftOffset(day),
							width: blockWidth,
							height: getHeight(day),
							// If course was not found, the color will be undefined so
							// the note should have "bg-primary-500" color as in className above
							backgroundColor: course?.color,
						}}>
						<div
							draggable
							onDragStart={handleDragStartTop}
							onDragEnd={handleDragEndTop}
							onDrag={handleDragTop}
							ref={topEdgeRef}
							className='absolute inset-x-0 top-0 h-2 cursor-ns-resize bg-black'></div>
						{note.content.slice(0, 20)}
						<div
							ref={bottomEdgeRef}
							className='absolute inset-x-0 bottom-0 h-2 cursor-ns-resize bg-black'></div>
					</Link>
				))}
		</>
	);
};

export default Note;
