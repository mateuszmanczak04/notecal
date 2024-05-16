'use client';

import { Button } from '@/components/ui/button';
import useCourses from '@/hooks/use-courses';
import { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

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
	const { data: coursesData } = useCourses();
	const containerRef = useRef<HTMLDivElement | null>(null);
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
	}, [clickX, clickY]);

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

	if (!coursesData?.courses) {
		return null;
	}

	const courses = coursesData.courses;

	return (
		<div
			ref={containerRef}
			className='fixed z-50 flex flex-col gap-2 rounded-md border bg-white p-2 shadow-xl'
			style={{ left: `${displayX}px`, top: `${displayY}px` }}>
			{courses.map(course => (
				<Button
					variant='secondary'
					key={course.id}
					onClick={() => submit(course.id)}>
					{course.name}
				</Button>
			))}
		</div>
	);
};

export default CreateNotePopup;
