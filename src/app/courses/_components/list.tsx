'use client';

import Item from './item';
import useCourses from '@/app/courses/_hooks/use-courses';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';

const List = () => {
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
		<Item
			color='#7701a9' // color specific to that course (course.colorHex)
			key={course.id}
			id={course.id}
			name={course.name}
			teacher={course.teacher}
		/>
	));
};

export default List;
