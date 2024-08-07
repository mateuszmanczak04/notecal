'use client';

import Course from './course';
import useCourses from '@/app/courses/_hooks/use-courses';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';

const Courses = () => {
	const { courses, error, isPending } = useCourses();

	if (isPending) return <LoadingSpinner />;

	if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

	if (!courses || courses.length === 0) {
		return (
			<p className='text-lg text-neutral-500'>
				You don&apos;t have any courses yet.
			</p>
		);
	}

	return courses.map(course => (
		<Course
			color={course.color}
			key={course.id}
			id={course.id}
			name={course.name}
			teacher={course.teacher}
		/>
	));
};

export default Courses;
