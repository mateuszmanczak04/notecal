'use client';

import updateNote from '@/app/notes/_actions/update-note';
import NoteContextMenu from '@/components/note-context-menu';
import { useToast } from '@/components/toast/use-toast';
import { useCourses } from '@/hooks/use-courses';
import { useNoteContextMenu } from '@/hooks/use-note-context-menu';
import { T_NoteWithTime } from '@/hooks/use-notes-with-time';
import { useUser } from '@/hooks/use-user';
import { cn } from '@/utils/cn';
import { toUTC } from '@/utils/timezone';
import { type Note as DaysViewNote } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDays, addMilliseconds, differenceInCalendarDays, startOfDay } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useCalendarContext } from '../_context/calendar-context';

type Props = {
	note: T_NoteWithTime & { loading?: boolean };
	leftOffset: number;
};

/**
 * A single note block displayed in calendar grid.
 */
const DaysViewNote = ({ note, leftOffset }: Props) => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: updateNote,
		onMutate: () => {
			queryClient.setQueryData(['notes'], (oldData: T_NoteWithTime[]) => {
				const updatedNotes = oldData.map(n =>
					n.id === note.id ? { ...n, startTime: toUTC(dragStartTime), endTime: toUTC(dragEndTime) } : n,
				);
				return updatedNotes;
			});
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({
					description: data.error,
					variant: 'destructive',
				});
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});
	const { data: courses } = useCourses();
	const { data: user } = useUser();

	const { currentFirstDay, getRelativePosition, getDateFromPosition } = useCalendarContext();

	const noteRef = useRef<HTMLDivElement[]>([]);
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

	// Maybe filtering all courses for each note is not the fastest
	// way to do it but let's assume that most of users don't have
	// more than 10-20 coursers. Then we shouldn't care that much about
	// the performance.
	// Also we can assume that course exists because there shouldn't
	// be any note without a corresponding course.
	const course = courses?.find(c => c.id === note.courseId);

	/**
	 * Returns days which are included in note's duration,
	 * all of them are set to 00:00.
	 */
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

	/**
	 * Returns an offset from the grid left edge in pixels.
	 * It's based on note's date.
	 */
	const getLeftOffset = (date: Date) => {
		if (!user) return;
		const daysFromFirstDay = differenceInCalendarDays(date, currentFirstDay);
		return `calc(${daysFromFirstDay * (100 / user.displayedDays) + '%'} + ${leftOffset * 16 + 'px'})`;
	};

	/**
	 * Returns a width of the note block in pixels. Simply divided
	 * 1 / settings.displayedDays with some improvements.
	 */
	const getWidth = () => {
		if (!user) return;
		return `calc(${100 / user.displayedDays}% - ${32 + 'px'})`;
	};

	/**
	 * Returns an offset from the grid top edge in pixels.
	 * It's based on the note's hour and minute.
	 */
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

	/**
	 * Returns a height of the note block.
	 * Remember that one Note can contain multiple blocks if it
	 * spreads into many days.
	 */
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

	/**
	 * Handles situations when user drags entire note by it's center.
	 * Here user starts dragging.
	 */
	const handleDragStart = (event: React.DragEvent) => {
		if (!noteRef.current?.includes(event.target as HTMLDivElement)) return;

		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return;

		const date = getDateFromPosition(x, y);
		if (!date) return;

		initialDragDate.current = date;
		setIsDragging(true);
	};

	/**
	 * Handles situations when user drags entire note by it's center.
	 * Here user is in the middle of the dragging.
	 */
	const handleDrag = (event: React.DragEvent) => {
		if (!noteRef.current?.includes(event.target as HTMLDivElement)) return;

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

	/**
	 * Handles situations when user drags entire note by it's center.
	 * Here user releases the cursor.
	 */
	const handleDragEnd = (event: React.DragEvent) => {
		if (!noteRef.current?.includes(event.target as HTMLDivElement)) return;

		mutate({
			id: note.id,
			startTime: toUTC(dragStartTime),
			endTime: toUTC(dragEndTime),
		});

		setIsDragging(false);
	};

	/**
	 * Handles situations when user drags note's top edge (startTime).
	 * Here user starts pressing the mouse.
	 */
	const handleDragStartTop = () => {
		setIsDragging(true);
	};

	/**
	 * Handles situations when user drags note's top edge (startTime).
	 * Here user is in the middle of the action.
	 */
	const handleDragTop = (event: React.DragEvent) => {
		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return;

		const newStartTime = getDateFromPosition(x, y);
		if (!newStartTime) return;

		setDragStartTime(newStartTime);
	};

	/**
	 * Handles situations when user drags note's top edge (startTime).
	 * Here user is releasing their mouse
	 */
	const handleDragEndTop = () => {
		if (dragStartTime < note.endTime) {
			mutate({ id: note.id, startTime: toUTC(dragStartTime) });
		} else {
			mutate({
				id: note.id,
				startTime: toUTC(note.endTime),
				endTime: toUTC(dragStartTime),
			});
		}

		setIsDragging(false);
	};

	/**
	 * Handles situations when user drags note's bottom edge (endTime).
	 * Here user starts pressing the mouse.
	 */
	const handleDragStartBottom = () => {
		setIsDragging(true);
	};

	/**
	 * Handles situations when user drags note's bottom edge (endTime).
	 * Here user is in the middle of the action.
	 */
	const handleDragBottom = (event: React.DragEvent) => {
		const { x, y } = getRelativePosition(event.clientX, event.clientY);
		if (x === null || y === null) return;

		const newEndTime = getDateFromPosition(x, y);
		if (!newEndTime) return;

		setDragEndTime(newEndTime);
	};

	/**
	 * Handles situations when user drags note's bottom edge (endTime).
	 * Here user is releasing their mouse
	 */
	const handleDragEndBottom = () => {
		if (dragEndTime > note.startTime) {
			mutate({ id: note.id, endTime: toUTC(dragEndTime) });
		} else {
			mutate({
				id: note.id,
				endTime: toUTC(note.startTime),
				startTime: toUTC(dragEndTime),
			});
		}

		setIsDragging(false);
	};

	/**
	 * Dates that are included into a single note.
	 */
	const noteDays = getDaysBetween(note.startTime, note.endTime);

	// Swap note.startTime and note.endTime if endTime > startTime
	const [actualDragStartTime, actualDragEndTime] = [
		dragStartTime < dragEndTime ? dragStartTime : dragEndTime,
		dragStartTime < dragEndTime ? dragEndTime : dragStartTime,
	];

	/**
	 * Days displayed on top when dragging. The same as "noteDays"
	 * but used when user is dragging the note or it's edge.
	 */
	const dragDays = getDaysBetween(actualDragStartTime, actualDragEndTime);

	// Context menu related below:
	const { closeContextMenu, contextMenuPosition, handleContextMenu } = useNoteContextMenu();

	// Handle routng to /notes/[id] page:
	const router = useRouter();
	const handleRoute = () => {
		router.push(`/notes/${note.id}`);
	};

	// Should not occur in normal app conditions
	if (!courses || !user || !course) return;

	return (
		<>
			{/* Primary notes, appear like ghost notes before user released mouse when dragging: */}
			{noteDays?.length > 0 &&
				noteDays.map((day, index) => (
					<div
						key={day.toString()}
						className={cn(
							'absolute min-h-4 min-w-8 cursor-pointer select-none  rounded-xl border-2 border-white bg-primary-500 transition dark:border-neutral-800',
							isDragging && 'opacity-50',
						)}
						style={{
							top: getTopOffset(day, note.startTime),
							left: getLeftOffset(day),
							width: getWidth(),
							height: getHeight(day, note.startTime, note.endTime),
							// If course was not found, the color will be undefined so
							// the note should have "bg-primary-500" color as in className above
							backgroundColor: course.color || '',
						}}
						ref={el => {
							noteRef.current[index] = el as HTMLDivElement;
						}}
						draggable
						onDragStart={handleDragStart}
						onDrag={handleDrag}
						onDragEnd={handleDragEnd}
						onDragOver={e => e.preventDefault()}
						onContextMenu={handleContextMenu}>
						{/* Top edge to drag: */}
						{index === 0 && (
							<div
								draggable
								onDragStart={handleDragStartTop}
								onDragEnd={handleDragEndTop}
								onDrag={handleDragTop}
								ref={topEdgeRef}
								className={cn(
									'absolute inset-x-0 top-0 z-30 h-2 cursor-ns-resize bg-black',
									isDragging ? 'opacity-0' : 'opacity-25',
								)}></div>
						)}

						{/* Center part (link) */}
						<div
							onClick={handleRoute}
							className='-mt-4 h-full w-full overflow-clip break-all pt-4 text-sm text-white'>
							<p className='m-4'>{note.title || course?.name}</p>
						</div>

						{/* Bottom edge to drag: */}
						{index === noteDays.length - 1 && (
							<div
								draggable
								onDragStart={handleDragStartBottom}
								onDragEnd={handleDragEndBottom}
								onDrag={handleDragBottom}
								ref={bottomEdgeRef}
								className={cn(
									'absolute inset-x-0 bottom-0 h-2 cursor-ns-resize bg-black',
									isDragging ? 'opacity-0' : 'opacity-25',
								)}></div>
						)}

						{/* Context menu on right mouse click */}
						{contextMenuPosition && (
							<NoteContextMenu
								position={contextMenuPosition}
								note={note}
								handleClose={closeContextMenu}
							/>
						)}
					</div>
				))}

			{/* Drag notes, visible only if user is currently dragging note: */}
			{isDragging &&
				dragDays?.length > 0 &&
				dragDays.map(day => (
					<div
						onDragOver={e => e.preventDefault()}
						key={day.toString()}
						className='pointer-events-none absolute z-30 select-none overflow-hidden rounded-xl border-2 border-white bg-primary-500 text-sm text-white transition dark:border-neutral-800'
						style={{
							top: getTopOffset(day, actualDragStartTime),
							left: getLeftOffset(day),
							width: getWidth(),
							height: getHeight(day, actualDragStartTime, actualDragEndTime),
							backgroundColor: course.color,
						}}>
						{/* Center part (link) */}
						<div
							onClick={handleRoute}
							className='-mt-4 h-full w-full overflow-clip break-all pt-4 text-sm text-white'>
							<p className='m-4'>{note.title || course?.name}</p>
						</div>
					</div>
				))}
		</>
	);
};

export default DaysViewNote;
