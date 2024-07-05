'use client';

import CourseItem from '@/components/courses/course-item';
import useCourses from '@/hooks/use-courses';
import { FC } from 'react';
import LoadingSpinner from '@/components/loading-spinner';
import ErrorMessage from '@/components/error-message';

interface CoursesListProps {}

const CoursesList: FC<CoursesListProps> = ({}) => {
	const { courses, error, isPending } = useCourses();

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

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
