import { getSettings } from '@/actions/settings/get-settings';
import { useQuery } from '@tanstack/react-query';

const useSettings = () =>
	useQuery({
		queryKey: ['settings'],
		queryFn: async () => await getSettings(),
		staleTime: Infinity,
	});

export default useSettings;
