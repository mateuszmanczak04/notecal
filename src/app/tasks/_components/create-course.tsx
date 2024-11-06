'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import useCourses from '@/app/courses/_hooks/use-courses';
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuList,
	DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { cn } from '@/lib/utils';
import { ClassNameValue } from 'tailwind-merge';

type Props = {
	onSelect: (courseId: string | null) => void;
	currentCourseId: string | null;
	className?: ClassNameValue;
};

const CreateCourse = ({ onSelect, currentCourseId, className }: Props) => {
	const { courses } = useCourses();
	const currentCourse = useCourse(currentCourseId);

	return (
		<DropdownMenu className={cn('w-52', className)}>
			<DropdownMenuTrigger showChevron>
				{currentCourse && (
					<div
						className='h-3 w-3 shrink-0 rounded-full'
						style={{ backgroundColor: currentCourse.color }}
					></div>
				)}
				<p className='truncate'>{currentCourse?.name || 'None'}</p>
			</DropdownMenuTrigger>
			<DropdownMenuList>
				{/* Null option */}
				<DropdownMenuItem onSelect={onSelect} key={'none' + Math.random()} value={null}>
					None
				</DropdownMenuItem>

				{/* Options */}
				{courses &&
					courses.map(course => (
						<DropdownMenuItem onSelect={onSelect} key={course.id} value={course.id}>
							<div
								className='h-3 w-3 shrink-0 rounded-full'
								style={{ backgroundColor: course.color }}
							></div>
							<p className='truncate'>{course.name}</p>
						</DropdownMenuItem>
					))}
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default CreateCourse;
