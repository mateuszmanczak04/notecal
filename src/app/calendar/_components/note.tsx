'use client';

import { type Note } from '@prisma/client';
import { DragEventHandler, FC, useRef, useState, useTransition } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import { addDays, differenceInCalendarDays, startOfDay } from 'date-fns';
import Link from 'next/link';
import useCourse from '@/app/courses/_hooks/use-course';
import queryClient from '@/lib/query-client';
import updateNote from '@/app/notes/_actions/update-note';
import LocalNotes from '@/lib/local-notes';

interface NoteProps {
	note: Note;
}

const Note: FC<NoteProps> = ({ note }) => {
	const {
		currentFirstDay,
		daysToSee,
		getRelativePosition,
		getDateFromPosition,
	} = useCalendarContext();
	const [isPending, startTransition] = useTransition();
	const course = useCourse(note.courseId);

	const topEdgeRef = useRef<HTMLDivElement | null>(null);
	const bottomEdgeRef = useRef<HTMLDivElement | null>(null);
	// const [startTime, setStartTime] = useState(note.startTime);
	// const [endTime, setEndTime] = useState(note.endTime);
	// const [prevStartTime, setPrevStartTime] = useState(note.startTime);
	// const [prevEndTime, setPrevEndTime] = useState(note.endTime);

	// Used to display a visual overlay for dragged note:
	const [isDragging, setIsDragging] = useState(false);
	const [tempStartTime, setTempStartTime] = useState(note.startTime);
	const [tempEndTime, setTempEndTime] = useState(note.endTime);

	// 90% of day column width:
	const blockWidth = (100 / daysToSee) * 0.9 + '%';

	// Returns days which are included in note's duration,
	// All of them are set to 00:00:
	const getIncludedDays = (startTime: Date, endTime: Date) => {
		const durationInDays = differenceInCalendarDays(endTime, startTime) + 1;
		return new Array(durationInDays)
			.fill(startTime)
			.map((day, index) => {
				return startOfDay(addDays(day, index));
			})
			.filter((day, index) => {
				// If it's the last day:
				if (index === durationInDays - 1) {
					// And note ends at midnight:
					if (startOfDay(endTime).getTime() === endTime.getTime()) {
						// Don't render that last day
						return null;
					}
				}
				return day;
			});
	};

	// Get positions and sizes of each day block:
	const getLeftOffset = (date: Date) => {
		const daysFromFirstDay = differenceInCalendarDays(date, currentFirstDay);
		return daysFromFirstDay * (100 / daysToSee) + '%';
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

	// Dragging top edge
	const handleDragStartTop = async (event: React.DragEvent) => {
		setIsDragging(true);
	};

	const handleDragTop = async (event: React.DragEvent) => {
		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return; // TODO: display error message

		const newStartTime = getDateFromPosition(x, y);
		if (!newStartTime) return;

		if (newStartTime < note.endTime) {
			setTempStartTime(newStartTime);
		}
	};

	const handleDragEndTop = (event: React.DragEvent) => {
		startTransition(async () => {
			const { x, y } = getRelativePosition(event.clientX, event.clientY);
			if (x === null || y === null) return; // TODO: display error message

			const newStartTime = getDateFromPosition(x, y);
			if (!newStartTime) return;

			if (newStartTime < note.endTime) {
				await LocalNotes.update(note.id, { startTime: newStartTime });
				await updateNote({ id: note.id, startTime: newStartTime }); // TODO: optimistic updates
			} else {
				await LocalNotes.update(note.id, { startTime: note.endTime });
				await LocalNotes.update(note.id, { endTime: newStartTime });
				await updateNote({ id: note.id, startTime: note.endTime }); // TODO: optimistic updates
				await updateNote({ id: note.id, endTime: newStartTime }); // TODO: optimistic updates
			}

			setIsDragging(false);
		});
	};

	// Dragging bottom edge
	const handleDragStartBottom = (event: React.DragEvent) => {
		setIsDragging(true);
	};

	const handleDragBottom = async (event: React.DragEvent) => {
		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return; // TODO: display error message

		const newEndTime = getDateFromPosition(x, y);
		if (!newEndTime) return;

		if (newEndTime > note.startTime) {
			setTempEndTime(newEndTime);
		}
	};

	const handleDragEndBottom = (event: React.DragEvent) => {
		startTransition(async () => {
			const { x, y } = getRelativePosition(event.clientX, event.clientY);
			if (x === null || y === null) return; // TODO: display error message

			const newEndTime = getDateFromPosition(x, y);
			if (!newEndTime) return;

			if (newEndTime > note.startTime) {
				await LocalNotes.update(note.id, { endTime: newEndTime });
				await updateNote({ id: note.id, endTime: newEndTime }); // TODO: optimistic updates
			} else {
				await LocalNotes.update(note.id, { endTime: note.startTime });
				await LocalNotes.update(note.id, { startTime: newEndTime });
				await updateNote({ id: note.id, endTime: note.endTime }); // TODO: optimistic updates
				await updateNote({ id: note.id, startTime: newEndTime }); // TODO: optimistic updates
			}

			setIsDragging(false);
		});
	};

	// TODO: swap start and end time with onDrag
	// TODO: fix - showing 1 rect too much after setting time to midnight
	// TODO: handle escape key for cancelling

	const includedDays = getIncludedDays(note.startTime, note.endTime);
	const tempDays = getIncludedDays(tempStartTime, tempEndTime);

	return (
		<>
			{/* TODO: replace this with better indicator: */}
			{isPending && <p>Pending...</p>}
			{includedDays?.length > 0 &&
				includedDays.map((day, index) => (
					<Link
						onDragOver={e => e.preventDefault()}
						key={day.toString()}
						href={`/notes/${note.courseId}/${note.id}`}
						className='absolute z-20 min-h-4 select-none overflow-hidden rounded-xl bg-primary-500 text-white transition hover:opacity-75'
						style={{
							top: getTopOffset(day, note.startTime),
							left: getLeftOffset(day),
							width: blockWidth,
							height: getHeight(day, note.startTime, note.endTime),
							// If course was not found, the color will be undefined so
							// the note should have "bg-primary-500" color as in className above
							backgroundColor: course?.color,
						}}>
						{index === 0 && (
							<div
								draggable
								onDragStart={handleDragStartTop}
								onDragEnd={handleDragEndTop}
								onDrag={handleDragTop}
								ref={topEdgeRef}
								className='absolute inset-x-0 top-0 h-2 cursor-ns-resize opacity-0'></div>
						)}
						{!isDragging && <p className='m-4'>{note.content.slice(0, 20)}</p>}
						{index === includedDays.length - 1 && (
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

			{/* Visible only if user is currently dragging and edge: */}
			{isDragging &&
				tempDays?.length > 0 &&
				tempDays.map(day => (
					<div
						onDragOver={e => e.preventDefault()}
						key={day.toString()}
						className='pointer-events-none absolute z-30 select-none overflow-hidden rounded-xl bg-primary-500 text-white transition'
						style={{
							top: getTopOffset(day, tempStartTime),
							left: getLeftOffset(day),
							width: blockWidth,
							height: getHeight(day, tempStartTime, tempEndTime),
							backgroundColor: course?.color,
						}}>
						<p className='m-4'>{note.content.slice(0, 20)}</p>
					</div>
				))}
		</>
	);
};

export default Note;
