import queryClient from '@/lib/query-client';
import { Settings } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import getSettings from '../_actions/get-settings';
import updateSettings from '../_actions/update-settings';

type UpdateSettingsSchema = {
	theme?: 'dark' | 'light';
	orderTasks?: 'title' | 'createdAt' | 'dueDate' | 'priority' | 'completed';
	language?: 'en';
	displayedDays?: number;
	defaultNoteDuration?: number;
	zoomLevel?: 1 | 2 | 3 | 4 | 5;
};

const useSettings = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['settings'],
		queryFn: async () => {
			// if server action returns error message, throw it so it
			// is accessible as result of useQuery
			const { settings, error } = await getSettings();
			if (error) throw error;
			return settings;
		},
		staleTime: Infinity,
	});

	// Updating
	const { mutate: update } = useMutation({
		mutationFn: async (values: UpdateSettingsSchema) => {
			const { updatedSettings, error } = await updateSettings(values);
			if (error) throw new Error(error);
			return updatedSettings;
		},
		onMutate: async (values: UpdateSettingsSchema) => {
			await queryClient.cancelQueries({ queryKey: ['settings'] });
			const previousSettings = queryClient.getQueryData(['settings']);

			await queryClient.setQueryData(['settings'], (oldSettings: Settings) => {
				return { ...oldSettings, ...values };
			});

			return previousSettings;
		},
		onError: (_err, _variables, context) => {
			// Rollback previous state
			queryClient.setQueryData(['settings'], context);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ['settings'] });
		},
	});

	return { settings: data, isPending, error, update };
};

export default useSettings;
