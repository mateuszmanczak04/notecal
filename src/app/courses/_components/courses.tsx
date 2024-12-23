'use client';

import { useAppContext } from '@/app/_components/app-context';
import { Suspense } from 'react';
import Course, { CourseFallback } from './course';

const Courses = () => {
	const { courses } = useAppContext();

	return (
		<>
			{courses?.map(course => (
				<Suspense key={course.id} fallback={<CourseFallback />}>
					<Course color={course.color} id={course.id} name={course.name} teacher={course.teacher} />
				</Suspense>
			))}
		</>
	);
};

export default Courses;
