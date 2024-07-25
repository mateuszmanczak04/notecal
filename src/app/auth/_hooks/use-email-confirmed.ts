import { useQuery } from '@tanstack/react-query';
import getEmailConfirmed from '../_actions/get-email-confirmed';

const useEmailConfirmed = () => {
	const { data, error, isPending } = useQuery({
		queryKey: ['email-confirmed'],
		queryFn: async () => await getEmailConfirmed(),
	});

	return {
		emailConfirmed: data?.emailConfirmed,
		error,
		isPending,
	};
};

export default useEmailConfirmed;
