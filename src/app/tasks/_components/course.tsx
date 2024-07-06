'use client';

import updateTask from '@/app/tasks/_actions/update-task';
import useCourse from '@/app/courses/_hooks/use-course';
import useCourses from '@/app/courses/_hooks/use-courses';
import { updateTaskCourseId as updateTaskCourseIdLocal } from '@/lib/update-task';
import { cn, OTHER_COURSE_NAME } from '@/lib/utils';
import { FC, useRef, useState, useTransition } from 'react';
import Tag from './tag';
import { useOnClickOutside } from 'usehooks-ts';

interface TaskCourseProps {
	id: string;
	courseId: string | null;
}

const Course: FC<TaskCourseProps> = ({ id, courseId }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isPending, startTransition] = useTransition();
	const menuRef = useRef<HTMLDivElement | null>(null);
	const currentCourse = useCourse(courseId);
	const { courses } = useCourses();

	const handleSaveChange = (newCourseId: string | null) => {
		if (currentCourse && newCourseId === currentCourse.id) return;

		startTransition(() => {
			updateTask({
				id,
				courseId: newCourseId === OTHER_COURSE_NAME ? null : newCourseId,
			});
			updateTaskCourseIdLocal(id, newCourseId);
		});
	};

	const handleCloseMenu = () => {
		setIsOpen(false);
	};

	const handleOpenMenu = () => {
		setIsOpen(true);
	};

	useOnClickOutside(menuRef, () => {
		handleCloseMenu();
	});

	return (
		<div className='relative'>
			<Tag
				text={currentCourse?.name || 'No course'}
				onClick={handleOpenMenu}
				className={cn('transition', isPending && 'opacity-50')}
			/>
			{isOpen && (
				<div
					ref={menuRef}
					className='absolute left-0 top-7 flex flex-col items-center justify-center rounded-md border bg-white shadow-xl'>
					<button
						className='flex h-8 w-full cursor-pointer select-none items-center justify-center px-4 transition hover:bg-neutral-100'
						onClick={() => {
							handleSaveChange(null);
							handleCloseMenu();
						}}>
						No course
					</button>
					{courses?.map(course => (
						<button
							className='flex h-8 w-full cursor-pointer select-none items-center justify-center px-4 transition hover:bg-neutral-100'
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
