import useCourses from '@/hooks/use-courses';

// used to filter all courses to find the one with the matching id
const useCourse = (courseId: string | null) => {
	const { data } = useCourses();
	if (!courseId) return null;
	const course = data?.courses?.find(course => course.id === courseId);
	return course;
};

export default useCourse;
