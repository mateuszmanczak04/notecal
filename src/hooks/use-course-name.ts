import useCourse from '@/hooks/use-course';

const useCourseName = (id: string) => {
	const course = useCourse(id);
	if (!course) {
		return null;
	}
	return course.name;
};

export default useCourseName;
