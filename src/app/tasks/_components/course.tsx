'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import useCourses from '@/app/courses/_hooks/use-courses';
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuList,
	DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';

type Props = {
	onSelect: (courseId: string | null) => void;
	currentCourseId: string | null;
};

const Course = ({ onSelect, currentCourseId }: Props) => {
	const { courses } = useCourses();
	const currentCourse = useCourse(currentCourseId);

	return (
		<DropdownMenu className='w-52'>
			<DropdownMenuTrigger showChevron>
				{currentCourse && (
					<div
						className='h-3 w-3 shrink-0 rounded-full'
						style={{ backgroundColor: currentCourse.color }}></div>
				)}
				<p className='truncate'>{currentCourse?.name || 'None'}</p>
			</DropdownMenuTrigger>
			<DropdownMenuList>
				{/* Null option */}
				<DropdownMenuItem
					onSelect={onSelect}
					key={'none' + Math.random()}
					value={null}>
					None
				</DropdownMenuItem>

				{/* Options */}
				{courses &&
					courses.map(course => (
						<DropdownMenuItem
							onSelect={onSelect}
							key={course.id}
							value={course.id}>
							<div
								className='h-3 w-3 shrink-0 rounded-full'
								style={{ backgroundColor: course.color }}></div>
							<p className='truncate'>{course.name}</p>
						</DropdownMenuItem>
					))}
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default Course;
