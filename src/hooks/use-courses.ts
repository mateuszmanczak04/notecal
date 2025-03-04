import { Course } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export const useCourses = () => {
	return useQuery({
		queryKey: ['courses'],
		queryFn: async () =>
			await fetch('/api/courses')
				.then(res => res.json())
				.then(data => (data.courses || []) as Course[])
				.catch(), // TODO
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
