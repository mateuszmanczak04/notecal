'use client';

import useCourses from '@/app/courses/_hooks/use-courses';
import createNote from '@/app/notes/_actions/create-note';
import useSettings from '@/app/settings/_hooks/use-settings';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Button } from '@/components/ui/button';
import LocalNotes from '@/lib/local-notes';
import { format } from 'date-fns';
import Link from 'next/link';
import { FC, useRef, useTransition } from 'react';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

interface CoursePickerProps {
	time: Date;
	x: number;
	y: number;
	hidePicker: () => void;
}

const CoursePicker: FC<CoursePickerProps> = ({ hidePicker, time, x, y }) => {
	const { courses, isPending } = useCourses(); // TODO: error handling
	const pickerRef = useRef<HTMLDivElement | null>(null);
	const { settings } = useSettings();
	const [_, startTransition] = useTransition();

	const handleSelect = (courseId: string) => {
		if (!settings) return;

		// TODO: optimistic updates
		startTransition(async () => {
			const newTemporaryNote = {
				courseId,
				content: 'Empty note',
				startTime: time,
				endTime: new Date(
					time.getTime() + settings.defaultNoteDuration * 60 * 1000,
				),
				id: crypto.randomUUID(),
				userId: '',
			};
			await LocalNotes.append(newTemporaryNote);
			await createNote({ courseId, content: 'Empty note', startTime: time });
			hidePicker();
		});
	};

	useOnClickOutside(pickerRef, hidePicker);

	useEventListener('keydown', (event: KeyboardEvent) => {
		if (event.key === 'Escape') {
			hidePicker();
		}
	});

	if (isPending)
		return (
			<div
				className='absolute rounded-xl bg-white p-4 shadow-xl'
				ref={pickerRef}
				style={{ left: x, top: y }}>
				<LoadingSpinner />
			</div>
		);

	if (!courses || courses.length === 0) {
		return (
			<div
				className='absolute flex flex-col gap-2 rounded-xl bg-white p-4 shadow-xl'
				ref={pickerRef}
				style={{ left: x, top: y }}>
				You don&apos;t have any courses yet
				<Button size='sm' asChild>
					<Link href='/courses/create'>Create one</Link>
				</Button>
			</div>
		);
	}

	return (
		<>
			{/* Backdrop: */}
			<div className='absolute inset-0 z-30 bg-neutral-300/50'></div>
			{/* Popup: */}
			<div
				className='absolute z-40 flex min-w-40 max-w-96 flex-col overflow-hidden rounded-xl border bg-white shadow-xl'
				ref={pickerRef}
				style={{ left: x, top: y }}>
				<p className='w-full py-1 text-center text-sm '>
					{format(time, 'yyyy/MM/dd hh:mm')}
				</p>
				{courses?.map(course => (
					<button
						key={course.id}
						onClick={() => handleSelect(course.id)}
						className='flex w-full items-center justify-center px-4 py-2 text-white transition hover:bg-neutral-100'
						style={{ color: course.color }}>
						{course.name}
					</button>
				))}
			</div>
		</>
	);
};

export default CoursePicker;
