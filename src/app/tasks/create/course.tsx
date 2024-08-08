'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import useCourses from '@/app/courses/_hooks/use-courses';
import { cn } from '@/lib/utils';
import { FC, useRef, useState, useTransition } from 'react';
import Tag from '../_components/tag';
import { useOnClickOutside } from 'usehooks-ts';

interface TaskCourseProps {
	onSelect: (courseId: string | null) => void;
	currentCourseId: string | null;
}

const Course: FC<TaskCourseProps> = ({ onSelect, currentCourseId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const { courses } = useCourses();
	const currentCourse = useCourse(currentCourseId);

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleOpenMenu = () => {
		setIsOpen(true);
	};

	const handleToggleMenu = () => {
		if (isOpen) {
			handleCloseMenu();
		} else {
			handleOpenMenu();
		}
	};

	useOnClickOutside(menuRef, () => {
		handleCloseMenu();
	});

	return (
		<div className='relative text-sm sm:text-base' ref={menuRef}>
			<Tag
				text={currentCourse?.name || 'No course'}
				onClick={handleToggleMenu}
				className='max-w-none'
			/>
			{isOpen && (
				<div className='absolute left-0 top-7 z-20 flex w-full flex-col justify-center rounded-md border bg-white shadow-xl'>
					<button
						className='h-8 w-full cursor-pointer select-none text-nowrap px-4 transition hover:bg-neutral-100'
						onClick={() => {
							onSelect(null);
							handleCloseMenu();
						}}>
						No course
					</button>
					{courses?.map(course => (
						<button
							className='h-8 cursor-pointer select-none truncate text-nowrap px-4 transition hover:bg-neutral-100 sm:max-w-none'
							key={course.id}
							onClick={() => {
								onSelect(course.id);
								handleCloseMenu();
							}}>
							{course.name}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Course;
