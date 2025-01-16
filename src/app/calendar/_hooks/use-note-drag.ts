import updateNote from '@/app/notes/_actions/update-note';
import { useToast } from '@/components/toast/use-toast';
import { T_NoteWithTime } from '@/hooks/use-notes-with-time';
import { toUTC } from '@/utils/timezone';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMilliseconds } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { useCalendarContext } from '../_context/calendar-context';
import { getDaysIncludedInNote } from '../_utils/get-days-included-in-note';

type T_Props = {
	note: T_NoteWithTime;
	noteRef: React.RefObject<HTMLDivElement[]>;
};

/**
 * Hook for handling note dragging.
 */
export const useNoteDrag = ({ note, noteRef }: T_Props) => {
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
	const { getRelativePosition, getDateFromPosition } = useCalendarContext();

	const [isDragging, setIsDragging] = useState(false);
	const topEdgeRef = useRef<HTMLDivElement | null>(null);
	const bottomEdgeRef = useRef<HTMLDivElement | null>(null);
	const [dragStartTime, setDragStartTime] = useState(note.startTime);
	const [dragEndTime, setDragEndTime] = useState(note.endTime);
	const initialDragDate = useRef<Date | null>(null);

	useEffect(() => {
		setDragStartTime(note.startTime);
		setDragEndTime(note.endTime);
	}, [note.startTime, note.endTime]);

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

	// Swap note.startTime and note.endTime if endTime > startTime
	const [actualDragStartTime, actualDragEndTime] = [
		dragStartTime < dragEndTime ? dragStartTime : dragEndTime,
		dragStartTime < dragEndTime ? dragEndTime : dragStartTime,
	];

	/**
	 * Days displayed on top when dragging. The same as "noteDays"
	 * but used when user is dragging the note or it's edge.
	 */
	const dragDays = getDaysIncludedInNote({ noteStartTime: actualDragStartTime, noteEndTime: actualDragEndTime });

	return {
		handleDragStart,
		handleDrag,
		handleDragEnd,
		handleDragStartTop,
		handleDragTop,
		handleDragEndTop,
		handleDragStartBottom,
		handleDragBottom,
		handleDragEndBottom,
		isDragging,
		dragDays,
		actualDragStartTime,
		actualDragEndTime,
		topEdgeRef,
		bottomEdgeRef,
	};
};
