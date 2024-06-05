'use client';

import CourseItem from '@/components/courses/course-item';
import useCourses from '@/hooks/use-courses';
import { FC } from 'react';
import LoadingSpinner from '@/components/loading-spinner';

interface CoursesListProps {}

const CoursesList: FC<CoursesListProps> = ({}) => {
	const { courses, error, isPending } = useCourses();

	if (isPending) return <LoadingSpinner />;

	if (error) {
		return <p className='text-red-500'>{error.message}</p>;
	}

	if (!courses || courses.length === 0) {
		return (
			<p className='text-lg text-gray-500'>
				You don&apos;t have any courses yet.
			</p>
		);
	}

	return courses.map(course => (
		<CourseItem
			key={course.id}
			id={course.id}
			name={course.name}
			teacher={course.teacher}
		/>
	));
};

export default CoursesList;
