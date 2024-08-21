'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import useCourses from '@/app/courses/_hooks/use-courses';
import DropdownMenu from '@/components/common/dropdown-menu';
import { ClassNameValue } from 'tailwind-merge';

type Props = {
	onSelect: (courseId: string | null) => void;
	currentCourseId: string | null;
	className?: ClassNameValue;
};

const Course = ({ onSelect, currentCourseId, className }: Props) => {
	const { courses } = useCourses();
	const currentCourse = useCourse(currentCourseId);

	const dropdownMenuOptions =
		courses?.map(course => ({
			value: course.id,
			label: course.name,
		})) || [];

	const currentOption = currentCourse
		? { value: currentCourse?.id, label: currentCourse.name }
		: { value: null, label: 'No course' };

	return (
		<DropdownMenu
			showNullOption
			options={dropdownMenuOptions}
			currentOption={currentOption}
			onChange={value => onSelect(value as string | null)}
			className={className}
		/>
	);
};

export default Course;
