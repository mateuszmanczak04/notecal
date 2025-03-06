import { useQuery } from '@tanstack/react-query';
import { T_LimitedUser } from '../types';
import { BACKEND_DOMAIN } from '../utils/app-domain';

export const useUser = () => {
	return useQuery({
		queryKey: ['user'],
		queryFn: async () =>
			await fetch(`${BACKEND_DOMAIN}/api/user`)
				.then(res => res.json())
				.then(res => {
					console.log(res);
					return res;
				})
				.then(res => (res.user as T_LimitedUser) || null)
				.catch(() => null),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
};
