'use client';

import CourseItem from '@/components/courses/course-item';
import useCourses from '@/hooks/use-courses';
import { FC } from 'react';
import { ClipLoader } from 'react-spinners';

interface CoursesListProps {}

const CoursesList: FC<CoursesListProps> = ({}) => {
	const { data, isLoading, isError, error, isFetching } = useCourses();

	const courses = data?.courses || [];

	if (isLoading || isFetching) {
		return <ClipLoader />;
	}

	if (isError) {
		return <p>Error: {error.message}</p>;
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
