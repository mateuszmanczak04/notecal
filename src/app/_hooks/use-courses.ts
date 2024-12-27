import { useQuery } from '@tanstack/react-query';
import getCourses from '../courses/_actions/get-courses';

export const useCourses = () => {
	return useQuery({ queryKey: ['courses'], queryFn: getCourses, refetchOnMount: false, refetchOnWindowFocus: false });
};
