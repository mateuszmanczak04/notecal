import { useQuery } from '@tanstack/react-query';
import { T_Course } from '../types';
import { BACKEND_DOMAIN } from '../utils/app-domain';

export const useCourses = () => {
	return useQuery({
		queryKey: ['courses'],
		queryFn: async () =>
			await fetch(`${BACKEND_DOMAIN}/api/courses`)
				.then(res => res.json())
				.then(data => (data.courses || []) as T_Course[])
				.catch(() => []),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
