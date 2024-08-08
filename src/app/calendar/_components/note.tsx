'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import useNotes from '@/app/notes/_hooks/use-notes';
import { cn } from '@/lib/utils';
import { type Note } from '@prisma/client';
import {
	addDays,
	addMilliseconds,
	differenceInCalendarDays,
	startOfDay,
} from 'date-fns';
import Link from 'next/link';
import { FC, useEffect, useRef, useState, useTransition } from 'react';
import { useCalendarContext } from '../_context/calendar-context';

interface NoteProps {
	note: Note & { loading?: boolean };
	leftOffset: number;
}

const Note: FC<NoteProps> = ({ note, leftOffset }) => {
	const {
		currentFirstDay,
		displayedDays,
		getRelativePosition,
		getDateFromPosition,
	} = useCalendarContext();
	const course = useCourse(note.courseId);
	const { update: updateNote } = useNotes();

	const noteRef = useRef<(HTMLAnchorElement | null)[]>([]);
	const initialDragDate = useRef<Date | null>(null);

	const topEdgeRef = useRef<HTMLDivElement | null>(null);
	const bottomEdgeRef = useRef<HTMLDivElement | null>(null);

	// Used to display a visual overlay for dragged note:
	const [isDragging, setIsDragging] = useState(false);
	const [dragStartTime, setDragStartTime] = useState(note.startTime);
	const [dragEndTime, setDragEndTime] = useState(note.endTime);

	useEffect(() => {
		setDragStartTime(note.startTime);
		setDragEndTime(note.endTime);
	}, [note.startTime, note.endTime]);

	// Returns days which are included in note's duration,
	// All of them are set to 00:00:
	const getDaysBetween = (startTime: Date, endTime: Date) => {
		const durationInDays = differenceInCalendarDays(endTime, startTime) + 1;
		const result = new Array(durationInDays)
			.fill(startTime)
			.map((day, index) => {
				return startOfDay(addDays(day, index));
			})
			.filter((day, index) => {
				// If it's the last day:
				if (index === durationInDays - 1) {
					// And note ends at midnight:
					if (endTime.getHours() === 0 && endTime.getMinutes() === 0) {
						// Don't render that last day
						return null;
					}
				}
				return day;
			});

		return result;
	};

	// Get positions and sizes of each day block:

	const getLeftOffset = (date: Date) => {
		const daysFromFirstDay = differenceInCalendarDays(date, currentFirstDay);
		return `calc(${daysFromFirstDay * (100 / displayedDays) + '%'} + ${leftOffset * 16 + 'px'}`;
	};

	const getWidth = () => {
		return `calc(${100 / displayedDays}% - ${32 + 'px'})`;
	};

	const getTopOffset = (date: Date, startTime: Date) => {
		// Check if it is not the first day of multi-day note:
		if (startOfDay(startTime).getTime() !== date.getTime()) {
			return 0;
		}

		const hours = startTime.getHours();
		const minutes = startTime.getMinutes();
		const totalMinutes = 60 * hours + minutes;
		const totalMinutesIn24h = 24 * 60;
		const ratio = totalMinutes / totalMinutesIn24h;
		return ratio * 100 + '%';
	};

	const getHeight = (date: Date, startTime: Date, endTime: Date) => {
		// Note starts and ends the same day:
		if (startOfDay(startTime).getTime() === startOfDay(endTime).getTime()) {
			const startHours = startTime.getHours();
			const startMinutes = startTime.getMinutes();
			const totalStartMinutes = 60 * startHours + startMinutes;

			const endHours = endTime.getHours();
			const endMinutes = endTime.getMinutes();
			const totalEndMinutes = 60 * endHours + endMinutes;

			const totalDuration = totalEndMinutes - totalStartMinutes;
			const totalMinutesIn24h = 24 * 60;
			const ratio = totalDuration / totalMinutesIn24h;

			return ratio * 100 + '%';
		}

		// If it's the first day of multi-day note:
		if (startOfDay(startTime).getTime() === date.getTime()) {
			const startHours = startTime.getHours();
			const startMinutes = startTime.getMinutes();
			const totalStartMinutes = 60 * startHours + startMinutes;

			const totalMinutesIn24h = 24 * 60;
			const totalDuration = totalMinutesIn24h - totalStartMinutes;
			const ratio = totalDuration / totalMinutesIn24h;
			return ratio * 100 + '%';
		}

		// It's the last day of multi-day note:
		if (startOfDay(endTime).getTime() === date.getTime()) {
			const endHours = endTime.getHours();
			const endMinutes = endTime.getMinutes();

			const totalEndMinutes = 60 * endHours + endMinutes;
			const totalMinutesIn24h = 24 * 60;
			const ratio = totalEndMinutes / totalMinutesIn24h;
			return ratio * 100 + '%';
		}

		// It's the day in the middle of >=3 day long notes
		// (can't be last and first):
		return '100%';
	};

	// Dragging entire note
	const handleDragStart = (event: React.DragEvent) => {
		if (!noteRef.current?.includes(event.target as HTMLAnchorElement)) return;

		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return;

		const date = getDateFromPosition(x, y);
		if (!date) return;

		initialDragDate.current = date;
		setIsDragging(true);
	};

	const handleDrag = (event: React.DragEvent) => {
		if (!noteRef.current?.includes(event.target as HTMLAnchorElement)) return;

		if (!initialDragDate.current) return;

		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return;

		const date = getDateFromPosition(x, y);
		if (!date) return;

		const dateDifference = date.getTime() - initialDragDate.current.getTime();

		const newStartTime = addMilliseconds(note.startTime, dateDifference);
		const newEndTime = addMilliseconds(note.endTime, dateDifference);

		setDragStartTime(newStartTime);
		setDragEndTime(newEndTime);
	};

	const handleDragEnd = (event: React.DragEvent) => {
		if (!noteRef.current?.includes(event.target as HTMLAnchorElement)) return;

		updateNote({
			id: note.id,
			startTime: dragStartTime,
			endTime: dragEndTime,
		});

		setIsDragging(false);
	};

	// Dragging top edge
	const handleDragStartTop = () => {
		setIsDragging(true);
	};

	const handleDragTop = (event: React.DragEvent) => {
		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return; // TODO: display error message

		const newStartTime = getDateFromPosition(x, y);
		if (!newStartTime) return;

		setDragStartTime(newStartTime);
	};

	const handleDragEndTop = (event: React.DragEvent) => {
		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return; // TODO: display error message

		const newStartTime = getDateFromPosition(x, y);
		if (!newStartTime) return;

		if (newStartTime < note.endTime) {
			updateNote({ id: note.id, startTime: newStartTime });
		} else {
			updateNote({
				id: note.id,
				startTime: note.endTime,
				endTime: newStartTime,
			});
		}

		setIsDragging(false);
	};

	// Dragging bottom edge
	const handleDragStartBottom = () => {
		setIsDragging(true);
	};

	const handleDragBottom = (event: React.DragEvent) => {
		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return; // TODO: display error message

		const newEndTime = getDateFromPosition(x, y);
		if (!newEndTime) return;

		setDragEndTime(newEndTime);
	};

	const handleDragEndBottom = (event: React.DragEvent) => {
		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return; // TODO: display error message

		const newEndTime = getDateFromPosition(x, y);
		if (!newEndTime) return;

		if (newEndTime > note.startTime) {
			updateNote({ id: note.id, endTime: newEndTime });
		} else {
			updateNote({
				id: note.id,
				endTime: note.startTime,
				startTime: newEndTime,
			});
		}

		setIsDragging(false);
	};

	const noteDays = getDaysBetween(note.startTime, note.endTime);

	// Used to swap them if start is greater than end
	const [actualDragStartTime, actualDragEndTime] = [
		dragStartTime < dragEndTime ? dragStartTime : dragEndTime,
		dragStartTime < dragEndTime ? dragEndTime : dragStartTime,
	];

	// Days displayed on top when dragging
	const dragDays = getDaysBetween(actualDragStartTime, actualDragEndTime);

	return (
		<>
			{/* TODO: show loading indicator somewhere */}

			{/* Primary notes: */}
			{noteDays?.length > 0 &&
				noteDays.map((day, index) => (
					<Link
						draggable
						onDragStart={handleDragStart}
						onDrag={handleDrag}
						onDragEnd={handleDragEnd}
						ref={el => (noteRef.current![index] = el)}
						onDragOver={e => e.preventDefault()}
						key={day.toString()}
						href={`/notes/${note.courseId}/${note.id}`}
						className={cn(
							'absolute z-20 min-h-4 min-w-8 select-none overflow-hidden rounded-xl border-2 border-white bg-primary-500 text-white transition dark:border-neutral-800',
							note.loading && 'pointer-events-none opacity-50',
							isDragging && 'opacity-50',
						)}
						style={{
							top: getTopOffset(day, note.startTime),
							left: getLeftOffset(day),
							width: getWidth(),
							height: getHeight(day, note.startTime, note.endTime),
							// If course was not found, the color will be undefined so
							// the note should have "bg-primary-500" color as in className above
							backgroundColor: course?.color,
						}}>
						{/* Top edge to drag: */}
						{index === 0 && (
							<div
								draggable
								onDragStart={handleDragStartTop}
								onDragEnd={handleDragEndTop}
								onDrag={handleDragTop}
								ref={topEdgeRef}
								className='absolute inset-x-0 top-0 h-2 cursor-ns-resize opacity-0'></div>
						)}

						{/* Title: */}
						{!isDragging && <p className='m-4'>{note.content.slice(0, 20)}</p>}

						{/* Bottom edge to drag: */}
						{index === noteDays.length - 1 && (
							<div
								draggable
								onDragStart={handleDragStartBottom}
								onDragEnd={handleDragEndBottom}
								onDrag={handleDragBottom}
								ref={bottomEdgeRef}
								className='absolute inset-x-0 bottom-0 h-2 cursor-ns-resize opacity-0'></div>
						)}
					</Link>
				))}

			{/* Drag notes, visible only if user is currently dragging edge: */}
			{isDragging &&
				dragDays?.length > 0 &&
				dragDays.map(day => (
					<div
						onDragOver={e => e.preventDefault()}
						key={day.toString()}
						className='pointer-events-none absolute z-30 select-none overflow-hidden rounded-xl border-2 border-white bg-primary-500 text-white transition dark:border-neutral-800'
						style={{
							top: getTopOffset(day, actualDragStartTime),
							left: getLeftOffset(day),
							width: getWidth(),
							height: getHeight(day, actualDragStartTime, actualDragEndTime),
							backgroundColor: course?.color,
						}}>
						<p className='m-4'>{note.content.slice(0, 20)}</p>
					</div>
				))}
		</>
	);
};

export default Note;
