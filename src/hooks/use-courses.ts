import { getCourses } from '@/actions/courses/get-courses';
import { useQuery } from '@tanstack/react-query';

/**
 * Uses react query to get courses from the backend.
 */
const useCourses = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['courses'],
		queryFn: async () => {
			// if server action returns error message, throw it so it
			// is accessible as result of useQuery
			const { courses, error } = await getCourses();
			if (error) throw new Error(error);
			return { courses };
		},
		staleTime: Infinity,
	});
	return { courses: data?.courses, isPending, error };
};

export default useCourses;
