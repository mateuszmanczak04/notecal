import { useQuery } from '@tanstack/react-query';
import { T_LimitedUser } from '../types';

export const useUser = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: async () =>
			await fetch('/api/user')
				.then(res => res.json())
				.then(res => (res.user as T_LimitedUser) || null)
				.catch(() => null),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
