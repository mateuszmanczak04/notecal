'use client';

import { Button } from '@/components/ui/button';
import useCourses from '@/app/courses/_hooks/use-courses';
import { FC, useEffect, useLayoutEffect, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import LoadingSpinner from '@/components/common/loading-spinner';
import { useCalendarContext } from '../../_context/calendar-context';

interface CreateNotePopupProps {
	clickX: number;
	clickY: number;
	submit: (courseId: string) => void;
	hide: () => void;
}

const CreateNotePopup: FC<CreateNotePopupProps> = ({
	clickX,
	clickY,
	submit,
	hide,
}) => {
	const {
		courses,
		isPending: isCoursesPending,
		error: coursesError,
	} = useCourses();
	const { containerRef } = useCalendarContext();
	const [displayX, setDisplayX] = useState<number>(clickX);
	const [displayY, setDisplayY] = useState<number>(clickY);

	useLayoutEffect(() => {
		if (!containerRef.current) return;

		const containerWidth = containerRef.current.getBoundingClientRect().width;
		const containerHeight = containerRef.current.getBoundingClientRect().height;
		const screenWidth = window.innerWidth;
		const screenHeight = window.innerHeight;

		if (screenWidth - clickX < containerWidth) {
			setDisplayX(clickX - containerWidth);
		}

		if (screenHeight - clickY < containerHeight) {
			setDisplayY(clickY - containerHeight);
		}
	}, [clickX, clickY, containerRef]);

	useOnClickOutside(containerRef, hide);

	useEffect(() => {
		const detectKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				hide();
			}
		};

		document.addEventListener('keydown', detectKeyDown, true);

		return () => document.removeEventListener('keydown', detectKeyDown);
	}, [hide]);

	return (
		<div
			ref={containerRef}
			className='bg-accent fixed z-50 flex flex-col gap-2 rounded-md p-2 shadow-xl'
			style={{ left: `${displayX}px`, top: `${displayY}px` }}>
			{isCoursesPending && <LoadingSpinner />}
			{coursesError && <p className='text-red-500'>{coursesError.message}</p>}
			{!courses ||
				(courses.length === 0 && <p>Could not find any course for you</p>)}
			{courses &&
				courses.map(course => (
					<Button
						key={course.id}
						onClick={() => submit(course.id)}
						variant='secondary'>
						{course.name}
					</Button>
				))}
		</div>
	);
};

export default CreateNotePopup;
