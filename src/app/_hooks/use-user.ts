import { useQuery } from '@tanstack/react-query';
import getUser from '../settings/_actions/get-user';

export const useUser = () => {
	return useQuery({ queryKey: ['user'], queryFn: getUser, refetchOnMount: false, refetchOnWindowFocus: false });
};
