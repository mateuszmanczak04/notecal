import { getCourses } from '@/actions/get-courses';
import queryClient from '@/lib/query-client';
import { useQuery } from '@tanstack/react-query';

const useCourses = () =>
	useQuery({
		queryKey: ['courses'],
		queryFn: async () => await getCourses(),
	});

export default useCourses;
