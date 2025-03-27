import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addMilliseconds } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { T_NoteWithTime } from '../../../hooks/use-notes-with-time';
import { useSettings } from '../../../hooks/use-settings';
import { useUser } from '../../../hooks/use-user';
import { BACKEND_DOMAIN } from '../../../utils/app-domain';
import { toUTC } from '../../../utils/timezone';
import { useToast } from '../../toast/use-toast';
import { useCalendarContext } from '../context/calendar-context';
import { getNoteDateFromXYPosition } from '../utils/get-date-from-position';
import { getDaysIncludedInNote } from '../utils/get-days-included-in-note';
import { getPositionRelativeToContainer } from '../utils/get-position-relative-to-container';

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
		mutationFn: async (data: { startTime?: Date; endTime?: Date }) =>
			await fetch(`${BACKEND_DOMAIN}/api/notes/${note.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then(res => res.json()),
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
	const { daysViewContainerRef: containerRef } = useCalendarContext();
	const { firstCalendarDay, displayedDays } = useSettings();
	const { data: user } = useUser();
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

		if (!containerRef.current || !user) return;

		const { x, y } = getPositionRelativeToContainer({
			x: event.clientX,
			y: event.clientY,
			container: containerRef.current,
		});
		if (x === null || y === null) return;

		const date = getNoteDateFromXYPosition({
			x,
			y,
			container: containerRef.current,
			firstCalendarDay,
			displayedDays,
		});
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

		if (!initialDragDate.current || !containerRef.current || !user) return;

		const { x, y } = getPositionRelativeToContainer({
			x: event.clientX,
			y: event.clientY,
			container: containerRef.current,
		});
		if (x === null || y === null) return;

		const date = getNoteDateFromXYPosition({
			x,
			y,
			container: containerRef.current,
			firstCalendarDay,
			displayedDays,
		});
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
		if (!containerRef.current || !user) return;
		const { x, y } = getPositionRelativeToContainer({
			x: event.clientX,
			y: event.clientY,
			container: containerRef.current,
		});
		if (x === null || y === null) return;

		const newStartTime = getNoteDateFromXYPosition({
			x,
			y,
			container: containerRef.current,
			firstCalendarDay,
			displayedDays,
		});
		if (!newStartTime) return;

		setDragStartTime(newStartTime);
	};

	/**
	 * Handles situations when user drags note's top edge (startTime).
	 * Here user is releasing their mouse
	 */
	const handleDragEndTop = () => {
		if (dragStartTime < note.endTime) {
			mutate({ startTime: toUTC(dragStartTime) });
		} else {
			mutate({
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
		if (!containerRef.current || !user) return;
		const { x, y } = getPositionRelativeToContainer({
			x: event.clientX,
			y: event.clientY,
			container: containerRef.current,
		});

		if (x === null || y === null) return;

		const newEndTime = getNoteDateFromXYPosition({
			x,
			y,
			container: containerRef.current,
			firstCalendarDay,
			displayedDays,
		});
		if (!newEndTime) return;

		setDragEndTime(newEndTime);
	};

	/**
	 * Handles situations when user drags note's bottom edge (endTime).
	 * Here user is releasing their mouse
	 */
	const handleDragEndBottom = () => {
		if (dragEndTime > note.startTime) {
			mutate({ endTime: toUTC(dragEndTime) });
		} else {
			mutate({
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
