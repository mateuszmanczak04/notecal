'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import useCourses from '@/app/courses/_hooks/use-courses';
import DropdownMenu from '@/components/common/dropdown-menu';

type Props = {
	onSelect: (courseId: string | null) => void;
	currentCourseId: string | null;
};

const Course = ({ onSelect, currentCourseId }: Props) => {
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
			options={dropdownMenuOptions}
			currentOption={currentOption}
			onChange={onSelect}
		/>
	);
};

export default Course;
