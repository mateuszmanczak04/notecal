'use client';

import { useQuery } from '@tanstack/react-query';
import getCourses from '../_actions/get-courses';
import Course from './course';

const Courses = () => {
	const { data: courses } = useQuery({
		queryKey: ['courses'],
		queryFn: getCourses,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});

	return courses && courses.map(course => <Course course={course} key={course.id} />);
};

export default Courses;
