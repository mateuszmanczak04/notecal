'use client';

import { useCourses } from '@/app/_hooks/use-courses';
import createNote from '@/app/notes/_actions/create-note';
import { Button } from '@/components/button';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { toUTC } from '@/utils/timezone';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useLayoutEffect, useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { useCalendarContext } from '../_context/calendar-context';

type Props = {
	time: Date;
	x: number;
	y: number;
	hidePicker: () => void;
};

const CoursePicker = ({ hidePicker, time, x, y }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { data: courses } = useCourses();
	const { mutate, isPending } = useMutation({
		mutationFn: createNote,
		onMutate: () => {
			// TODO: optimistic update
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	/** A reference to the popup div */
	const pickerRef = useRef<HTMLDivElement>(null!);
	const { containerRef } = useCalendarContext();
	const [pickerX, setPickerX] = useState(x);
	const [pickerY, setPickerY] = useState(y);

	// Detect if popup shouldn't display beyond the right or bottom
	// edge of the container, useLayoutEffect lets us perform calculations
	// before first render.
	useLayoutEffect(() => {
		if (!pickerRef.current || !containerRef.current) return;

		const pickerWidth = pickerRef.current.clientWidth;
		const pickerHeight = pickerRef.current.clientHeight;
		const containerWidth = containerRef.current.clientWidth;
		const containerHeight = containerRef.current.clientHeight;

		if (pickerWidth / 2 + x > containerWidth) {
			setPickerX(containerWidth - pickerWidth / 2);
		} else if (pickerWidth / 2 > x) {
			setPickerX(pickerWidth / 2);
		}

		if (pickerHeight / 2 + y > containerHeight) {
			setPickerY(containerHeight - pickerHeight / 2);
		} else if (pickerHeight / 2 > y) {
			setPickerY(pickerHeight / 2);
		}
	}, [containerRef, x, y]);

	const handleSelect = (courseId: string) => {
		mutate({ courseId, startTime: toUTC(time) });
		hidePicker();

		// TODO: restore with optimistic updates
		// Needed this timeout to move hidePicker at the end of the
		// call stack. Otherwise it would be hidden before note was created
		// setTimeout(() => {
		// 	hidePicker();
		// }, 0);
	};

	// Hide the course picker when clicked outside the popup
	useOnClickOutside(pickerRef, hidePicker);

	// Hide the course picker after pressing "Escape" key
	useEventListener('keydown', (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			hidePicker();
		}
	});

	/**
	 * It's displayed when user doesn't have any courses.
	 * It shows a link to /courses/create page.
	 */
	const ZeroCoursesContent = () => {
		return (
			<div className='w-64 p-4'>
				<p>You don&apos;t have any courses yet</p>
				<Button asChild className='mt-2 w-full'>
					<Link href='/courses/create' prefetch>
						<Plus />
						Create one
					</Link>
				</Button>
			</div>
		);
	};

	/**
	 * Displayed when user has at least one course.
	 * It shows a list of available courses which they want to
	 * choose for the new note.
	 */
	const SomeCoursesContent = () => {
		return (
			<div>
				<p className='w-full py-1 text-center text-sm '>{format(time, 'yyyy/MM/dd hh:mm')}</p>
				<div className='max-h-96 w-64 overflow-y-scroll'>
					{courses?.map(course => (
						<button
							key={course.id}
							onClick={() => handleSelect(course.id)}
							className='flex w-full items-center justify-center px-4 py-2 text-white transition hover:bg-neutral-100 dark:hover:bg-neutral-600'
							style={{ color: course.color }}>
							{course.name}
						</button>
					))}
				</div>
			</div>
		);
	};

	return (
		<>
			{/* Backdrop: */}
			<div className='absolute inset-0 z-30 bg-neutral-300 opacity-50 dark:bg-neutral-900'></div>

			{/* Popup: */}
			<div
				className={cn(
					'absolute z-40 flex min-w-40 max-w-96 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-neutral-700',
					isPending && 'pointer-events-none opacity-50',
				)}
				ref={pickerRef}
				style={{ left: pickerX, top: pickerY }}>
				{courses && courses.length > 0 ? <SomeCoursesContent /> : <ZeroCoursesContent />}
			</div>
		</>
	);
};

export default CoursePicker;
