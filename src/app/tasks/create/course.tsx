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
				className={cn(
					'h-9 max-w-none rounded-none border border-l border-r border-t border-transparent',
					isOpen ? 'rounded-t-xl dark:border-neutral-500' : 'rounded-xl',
				)}
			/>
			{isOpen && (
				<div className='absolute left-0 top-9 z-20 flex w-full flex-col justify-center rounded-b-xl border-b border-l border-r bg-white shadow-xl dark:border-neutral-500 dark:bg-neutral-600 '>
					<button
						className='h-9 w-full cursor-pointer select-none text-nowrap px-4 transition hover:bg-neutral-100 dark:hover:bg-neutral-500'
						onClick={() => {
							onSelect(null);
							handleCloseMenu();
						}}>
						No course
					</button>
					{courses?.map(course => (
						<button
							className='h-9 cursor-pointer select-none truncate text-nowrap px-4 transition hover:bg-neutral-100 dark:hover:bg-neutral-500 sm:max-w-none'
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
