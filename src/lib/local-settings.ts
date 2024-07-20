import { Settings } from '@prisma/client';
import queryClient from './query-client';

const update = async (properties: Object) => {
	await queryClient.setQueryData(
		['settings'],
		(prev: { settings: Settings }) => {
			return { settings: { ...prev.settings, ...properties } };
		},
	);
};

const LocalSettings = {
	update,
};

export default LocalSettings;
