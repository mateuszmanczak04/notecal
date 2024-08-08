'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import useCourses from '@/app/courses/_hooks/use-courses';
import { FC, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import useTasks from '../_hooks/use-tasks';
import Tag from '../../../components/common/tag';

interface TaskCourseProps {
	id: string;
	courseId: string | null;
}

const Course: FC<TaskCourseProps> = ({ id, courseId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const currentCourse = useCourse(courseId);
	const { courses } = useCourses();
	const { update: updateTask } = useTasks();

	const handleSaveChange = (newCourseId: string | null) => {
		if (currentCourse && newCourseId === currentCourse.id) return;
		updateTask({ id, courseId: newCourseId });
	};

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
			/>
			{isOpen && (
				<div className='absolute left-0 top-7 z-20 flex max-w-52 flex-col justify-center rounded-md border bg-white shadow-xl'>
					<button
						className='h-8 w-full cursor-pointer select-none text-nowrap px-4 transition hover:bg-neutral-100'
						onClick={() => {
							handleSaveChange(null);
							handleCloseMenu();
						}}>
						No course
					</button>
					{courses?.map(course => (
						<button
							className='h-8 cursor-pointer select-none truncate text-nowrap px-4 transition hover:bg-neutral-100 sm:max-w-none'
							key={course.id}
							onClick={() => {
								handleSaveChange(course.id);
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
