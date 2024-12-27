'use client';

import { useCourses } from '@/app/_hooks/use-courses';
import Course from './course';

const Courses = () => {
	const { data: courses } = useCourses();

	return courses && courses.map(course => <Course course={course} key={course.id} />);
};

export default Courses;
