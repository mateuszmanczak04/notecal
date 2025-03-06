import { useQuery } from '@tanstack/react-query';
import { T_Course } from '../types';

export const useCourses = () => {
	return useQuery({
		queryKey: ['courses'],
		queryFn: async () =>
			await fetch('/api/courses')
				.then(res => res.json())
				.then(data => (data.courses || []) as T_Course[])
				.catch(() => []),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
