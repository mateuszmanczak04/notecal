import { LimitedUser } from '@/app/api/user/route';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: async () =>
			await fetch('/api/user')
				.then(res => res.json())
				.then(res => (res.user as LimitedUser) || null)
				.catch(() => null),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
