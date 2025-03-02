'use client';

import NoteContextMenu from '@/app/notes/_components/context-menu/note-context-menu';
import { useNoteContextMenu } from '@/app/notes/_components/context-menu/use-note-context-menu';
import { useClientSide } from '@/hooks/use-client-side';
import { useCourses } from '@/hooks/use-courses';
import { T_NoteWithTime } from '@/hooks/use-notes-with-time';
import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/utils/cn';
import { type Note as DaysViewNote } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useNoteDrag } from '../_hooks/use-note-drag';
import { getCalendarRowHeight } from '../_utils/get-calendar-row-height';
import { getDaysIncludedInNote } from '../_utils/get-days-included-in-note';
import { getNoteBlockHeight } from '../_utils/get-note-block-height';
import { getNoteBlockLeftOffset } from '../_utils/get-note-block-left-offset';
import { getNoteBlockTopOffset } from '../_utils/get-note-block-top-offset';
import { getNoteBlockWidth } from '../_utils/get-note-block-width';

type Props = {
	note: T_NoteWithTime & { loading?: boolean };
	leftOffset: number;
};

/**
 * A single note block displayed in calendar grid.
 */
const DaysViewNote = ({ note, leftOffset }: Props) => {
	const { data: courses } = useCourses();
	const noteBlocksRef = useRef<HTMLDivElement[]>([]);
	const { firstCalendarDay, displayedDays, zoomLevel } = useSettings();
	const {
		handleDrag,
		handleDragBottom,
		handleDragEnd,
		handleDragEndBottom,
		handleDragEndTop,
		handleDragStart,
		handleDragStartBottom,
		handleDragStartTop,
		handleDragTop,
		isDragging,
		dragDays,
		actualDragEndTime,
		actualDragStartTime,
		topEdgeRef,
		bottomEdgeRef,
	} = useNoteDrag({ note, noteRef: noteBlocksRef });
	const [isHover, setIsHover] = useState(false);
	const isClient = useClientSide();

	// Context menu related below:
	const { closeContextMenu, contextMenuPosition, handleContextMenu, contextMenuBlockIndex } = useNoteContextMenu();

	const course = courses?.find(c => c.id === note.courseId);
	const noteDays = getDaysIncludedInNote({ noteStartTime: note.startTime, noteEndTime: note.endTime });

	// Handle routng to /notes/[id] page:
	const router = useRouter();
	const handleRoute = () => {
		router.push(`/notes?noteId=${note.id}`);
	};

	if (!isClient) return;

	// Should not occur in normal app conditions
	if (!courses || !course) return;

	return (
		<>
			{/* Primary notes, appear like ghost notes before user released mouse when dragging: */}
			{noteDays?.length > 0 &&
				noteDays.map((day, index) => (
					<div
						key={day.toString()}
						className={cn(
							'absolute min-h-4 min-w-8 cursor-pointer select-none  rounded-xl border-2 border-white bg-primary-500 transition-all dark:border-neutral-800',
							isDragging && 'opacity-50',
							isHover && 'opacity-90',
						)}
						onMouseEnter={() => setIsHover(true)}
						onMouseLeave={() => setIsHover(false)}
						style={{
							top: 0,
							transform: (() => {
								const notePercentTopOffset = getNoteBlockTopOffset({
									blockDay: day,
									noteStartTime: note.startTime,
								});
								const noteTopOffsetInAsNumber = parseFloat(notePercentTopOffset || '0') / 100;
								const noteTopOffsetInPx =
									noteTopOffsetInAsNumber * getCalendarRowHeight({ zoomLevel }) * 24;
								return `translateY(${noteTopOffsetInPx}px)`;
							})(),
							left: getNoteBlockLeftOffset({
								blockDay: day,
								firstCalendarDay: firstCalendarDay,
								displayedDays: displayedDays,
								leftOffset,
							}),
							width: getNoteBlockWidth({ displayedDays: displayedDays }),
							height: getNoteBlockHeight({
								blockDay: day,
								noteStartTime: note.startTime,
								noteEndTime: note.endTime,
							}),
							// If course was not found, the color will be undefined so
							// the note should have "bg-primary-500" color as in className above
							backgroundColor: course.color || '',
						}}
						ref={el => {
							noteBlocksRef.current[index] = el as HTMLDivElement;
						}}
						draggable
						onDragStart={handleDragStart}
						onDrag={handleDrag}
						onDragEndCapture={handleDragEnd}
						onDragOver={e => e.preventDefault()}
						onContextMenu={e => handleContextMenu(e, index)}>
						{/* Top edge to drag: */}
						{index === 0 && (
							<div
								draggable
								onDragStart={handleDragStartTop}
								onDragEndCapture={handleDragEndTop}
								onDrag={handleDragTop}
								ref={topEdgeRef}
								className={cn(
									'absolute inset-x-0 top-0 z-30 h-2 cursor-ns-resize rounded-t-xl bg-white',
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
								onDragEndCapture={handleDragEndBottom}
								onDrag={handleDragBottom}
								ref={bottomEdgeRef}
								className={cn(
									'absolute inset-x-0 bottom-0 h-2 cursor-ns-resize rounded-b-xl bg-black',
									isDragging ? 'opacity-0' : 'opacity-25',
								)}></div>
						)}

						{/* Context menu on right mouse click */}
						{contextMenuBlockIndex === index && contextMenuPosition && (
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
							top: getNoteBlockTopOffset({ blockDay: day, noteStartTime: actualDragStartTime }),
							left: getNoteBlockLeftOffset({
								blockDay: day,
								displayedDays: displayedDays,
								firstCalendarDay: firstCalendarDay,
								leftOffset,
							}),
							width: getNoteBlockWidth({ displayedDays: displayedDays }),
							height: getNoteBlockHeight({
								blockDay: day,
								noteStartTime: actualDragStartTime,
								noteEndTime: actualDragEndTime,
							}),
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
