import { useUser } from './use-user';

export const useEmailVerified = () => {
	const { data: user } = useUser();
	return user?.emailVerified;
};
