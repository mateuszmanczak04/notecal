import getCourses from '@/app/courses/_actions/get-courses';
import { useQuery } from '@tanstack/react-query';

export const useCourses = () => {
	return useQuery({ queryKey: ['courses'], queryFn: getCourses, refetchOnMount: false, refetchOnWindowFocus: false });
};
