import { ContextMenu, ContextMenuTrigger } from '@radix-ui/react-context-menu';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useCourses } from '../../../hooks/use-courses';
import { T_NoteWithTime } from '../../../hooks/use-notes-with-time';
import { useSettings } from '../../../hooks/use-settings';
import { cn } from '../../../utils/cn';
import NoteMenu from '../../notes/components/context-menu/note-menu';
import { useUpdateNoteTitle } from '../../notes/components/context-menu/use-update-note-title';
import { useNoteDrag } from '../hooks/use-note-drag';
import { getCalendarRowHeight } from '../utils/get-calendar-row-height';
import { getDaysIncludedInNote } from '../utils/get-days-included-in-note';
import { getNoteBlockHeight } from '../utils/get-note-block-height';
import { getNoteBlockLeftOffset } from '../utils/get-note-block-left-offset';
import { getNoteBlockTopOffset } from '../utils/get-note-block-top-offset';
import { getNoteBlockWidth } from '../utils/get-note-block-width';

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

	const course = courses?.find(c => c.id === note.courseId);
	const noteDays = getDaysIncludedInNote({ noteStartTime: note.startTime, noteEndTime: note.endTime });

	const navigate = useNavigate();

	/** Temporary state used to update note title: */
	const [title, setTitle] = useState('');
	const titleRef = useRef<HTMLInputElement | null>(null);
	const [isRenaming, setIsRenaming] = useState(false);
	const { mutate: mutateUpdateTitle, isPending: isUpdatingTitle } = useUpdateNoteTitle({
		note,
		onSettledCallback: () => setIsRenaming(false),
	});

	const handleStartRename = () => {
		setIsRenaming(true);
		setTitle(note.title);
		setTimeout(() => {
			titleRef.current?.focus();
		}, 1);
	};

	const handleCancelRename = () => {
		setTitle('');
		setIsRenaming(false);
	};

	const handleSubmitRename = (e: React.FormEvent) => {
		e.preventDefault();
		mutateUpdateTitle({ title });
	};

	// Should not occur in normal app conditions
	if (!courses || !course) return;

	return (
		<>
			{/* Primary notes, appear like ghost notes before user released mouse when dragging: */}
			{noteDays?.length > 0 &&
				noteDays.map((day, index) => (
					<ContextMenu key={day.toString()}>
						<ContextMenuTrigger
							className={cn(
								'bg-primary-500 absolute min-h-4 min-w-8 cursor-pointer select-none rounded-xl border-2 border-white transition-opacity hover:opacity-90 dark:border-neutral-800',
								isDragging && 'opacity-50',
							)}
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
							onDragOver={e => e.preventDefault()}>
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
								onClick={() => {
									navigate(`/notes?noteId=${note.id}`);
								}}
								className={cn(
									'-mt-4 h-full w-full break-all pt-4 text-sm text-white',
									isUpdatingTitle && 'pointer-events-none opacity-50',
									!isRenaming && 'overflow-clip',
								)}>
								{isRenaming ? (
									<form className='m-4' onSubmit={handleSubmitRename}>
										<input
											onKeyDown={e => {
												if (e.key === 'Escape') handleCancelRename();
											}}
											autoFocus
											placeholder='New title'
											value={title}
											onChange={e => setTitle(e.target.value)}
											onBlur={handleCancelRename}
											className='w-full text-wrap border-none outline-none'
										/>
									</form>
								) : (
									<p className='m-4'>{note.title || course?.name}</p>
								)}
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
						</ContextMenuTrigger>
						<NoteMenu note={note} onRename={handleStartRename} />
					</ContextMenu>
				))}

			{/* Drag notes, visible only if user is currently dragging note: */}
			{isDragging &&
				dragDays?.length > 0 &&
				dragDays.map(day => (
					<div
						onDragOver={e => e.preventDefault()}
						key={day.toString()}
						className='bg-primary-500 pointer-events-none absolute z-30 select-none overflow-hidden rounded-xl border-2 border-white text-sm text-white transition dark:border-neutral-800'
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
						<div className='-mt-4 h-full w-full overflow-clip break-all pt-4 text-sm text-white'>
							<p className='m-4'>{note.title || course?.name}</p>
						</div>
					</div>
				))}
		</>
	);
};

export default DaysViewNote;
