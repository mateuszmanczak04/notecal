'use client';

import { useToast } from '@/components/toast/use-toast';
import { useCourses } from '@/hooks/use-courses';
import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/utils/cn';
import { createTemporaryNote } from '@/utils/create-temporary-note';
import { toUTC } from '@/utils/timezone';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { motion } from 'motion/react';
import { useLayoutEffect, useRef, useState } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';
import { useCalendarContext } from '../context/calendar-context';

type Props = {
	time: Date;
	x: number;
	y: number;
	hidePicker: () => void;
};

const DaysViewCoursePicker = ({ hidePicker, time, x, y }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { data: courses } = useCourses();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { courseId: string; startTime?: Date; duration?: number }) =>
			await fetch('/api/notes', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}).then(res => res.json()),
		onMutate: data => {
			const tempNote = createTemporaryNote(data);
			queryClient.setQueryData(['notes'], (old: any) => [...old, tempNote]);
		},
		onSettled: data => {
			console.log(data);
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});
	const { defaultNoteDuration } = useSettings();

	/** A reference to the popup div */
	const pickerRef = useRef<HTMLDivElement>(null!);
	const { daysViewContainerRef: containerRef } = useCalendarContext();
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

		if (pickerWidth + x > containerWidth) {
			setPickerX(containerWidth - pickerWidth);
		}

		if (pickerHeight + y > containerHeight) {
			setPickerY(containerHeight - pickerHeight);
		}
	}, [containerRef, x, y]);

	const handleSelect = (courseId: string) => {
		mutate({ courseId, startTime: toUTC(time), duration: defaultNoteDuration });
		hidePicker();
	};

	// Hide the course picker when clicked outside the popup
	useOnClickOutside(pickerRef, hidePicker);

	// Hide the course picker after pressing "Escape" key
	useEventListener('keydown', (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			hidePicker();
		}
	});

	return (
		<>
			{/* Backdrop: */}
			<motion.div
				key='backdrop'
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.25 }}
				exit={{ opacity: 0 }}
				className='absolute inset-0 z-30 bg-black'></motion.div>

			{/* Popup: */}
			{courses && courses.length > 0 && (
				<motion.div
					key='popup'
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					className={cn(
						'absolute z-30 flex max-h-[60vh] min-w-40 max-w-96 flex-col overflow-hidden rounded-xl bg-white p-4 shadow-xl dark:bg-neutral-800',
						isPending && 'pointer-events-none opacity-50',
					)}
					ref={pickerRef}
					style={{ left: pickerX, top: pickerY }}>
					<p className='text-sm font-semibold'>Create a new note</p>
					<p className='mt-1 text-sm opacity-75'>{format(time, 'yyyy/MM/dd hh:mm')}</p>
					{courses.length === 0 && <p className='mt-2 text-sm'>You don&apos;t have any courses yet</p>}
					<div className='scrollbar-hide mt-2 overflow-y-scroll rounded-md'>
						{courses?.map(course => (
							<button
								key={course.id}
								onClick={() => handleSelect(course.id)}
								className='w-full rounded-md px-3 py-2 text-start text-sm text-white transition hover:bg-neutral-100 hover:opacity-75 dark:hover:bg-neutral-700'
								style={{ color: course.color }}>
								<p className='truncate'>{course.name}</p>
							</button>
						))}
					</div>
				</motion.div>
			)}
		</>
	);
};

export default DaysViewCoursePicker;
