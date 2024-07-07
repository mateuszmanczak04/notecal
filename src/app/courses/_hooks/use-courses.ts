import getCourses from '@/app/courses/_actions/get-courses';
import { useQuery } from '@tanstack/react-query';

const useCourses = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['courses'],
		queryFn: async () => {
			const { courses, error } = await getCourses();
			if (error) throw new Error(error);
			return { courses };
		},
	});
	return { courses: data?.courses, isPending, error };
};

export default useCourses;
