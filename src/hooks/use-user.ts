import getUser from '@/app/settings/_actions/get-user';
import { useQuery } from '@tanstack/react-query';

export const useUser = () => {
	return useQuery({ queryKey: ['user'], queryFn: getUser, refetchOnMount: false, refetchOnWindowFocus: false });
};
