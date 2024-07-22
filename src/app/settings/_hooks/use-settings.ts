import getSettings from '../_actions/get-settings';
import { useQuery } from '@tanstack/react-query';

/**
 * Uses react query to get user settings from the backend.
 */
const useSettings = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['settings'],
		queryFn: async () => {
			// if server action returns error message, throw it so it
			// is accessible as result of useQuery
			const { settings, error } = await getSettings();
			if (error) throw error;
			return { settings };
		},
		staleTime: Infinity,
	});

	return { settings: data?.settings, isPending, error };
};

export default useSettings;
