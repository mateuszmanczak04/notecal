'use client';

import { useCourses } from '@/hooks/use-courses';
import Course from './course';

const Courses = () => {
	const { data: courses } = useCourses();

	if (!courses) return;

	return courses.map(course => <Course course={course} key={course.id} />);
};

export default Courses;
