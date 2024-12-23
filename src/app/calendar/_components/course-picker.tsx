'use client';

import { Button } from '@/components/button';
import { Course } from '@prisma/client';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { FC, RefObject, useLayoutEffect, useRef, useState } from 'react';
import { uid } from 'uid';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { useCalendarContext } from '../_context/calendar-context';

interface CoursePickerProps {
	time: Date;
	x: number;
	y: number;
	hidePicker: () => void;
}

const CoursePicker: FC<CoursePickerProps> = ({ hidePicker, time, x, y }) => {
	const courses = [] as Course[];
	const pickerRef = useRef<HTMLDivElement | null>(null) as RefObject<HTMLDivElement>;
	const settings = {};
	const { containerRef } = useCalendarContext();
	const [pickerX, setPickerX] = useState(x);
	const [pickerY, setPickerY] = useState(y);

	const addNewNote = (input: any) => {};

	// Detect if popup shouldn't display beyond the right or bottom
	// edge of the container
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
		if (!settings) return;

		const newNoteId = uid();

		// addNewNote({
		// 	id: newNoteId,
		// 	content: '',
		// 	startTime: time,
		// 	endTime: new Date(time.getTime() + settings.defaultNoteDuration * 60 * 1000),
		// 	courseId,
		// });

		/** Needed this timeout to move hidePicker at the end of the call stack. Otherwise it would be hidden before note was created */
		setTimeout(() => {
			hidePicker();
		}, 0);
	};

	useOnClickOutside(pickerRef, hidePicker);

	useEventListener('keydown', (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			hidePicker();
		}
	});

	return (
		<>
			{/* Backdrop: */}
			<div className='absolute inset-0 z-30 bg-neutral-300 opacity-50 dark:bg-neutral-900'></div>

			{/* Popup: */}
			<div
				className='absolute z-40 flex min-w-40 max-w-96 -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl bg-white shadow-xl dark:bg-neutral-700'
				ref={pickerRef}
				style={{ left: pickerX, top: pickerY }}>
				{!courses || courses.length === 0 ? (
					<div className='w-64 p-4'>
						<p>You don&apos;t have any courses yet</p>
						<Button asChild className='mt-2 w-full'>
							<Link href='/courses/create' prefetch>
								<Plus />
								Create one
							</Link>
						</Button>
					</div>
				) : (
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
				)}
			</div>
		</>
	);
};

export default CoursePicker;
