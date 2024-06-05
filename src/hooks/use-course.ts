import useCourses from '@/hooks/use-courses';

/**
 * used to filter all courses and find the one with the matching id
 */
const useCourse = (courseId: string | null) => {
	const { courses } = useCourses();
	if (!courseId) return null;
	const course = courses?.find(course => course.id === courseId) || null;
	return course;
};

export default useCourse;
