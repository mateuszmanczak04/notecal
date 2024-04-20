import { SettingsContext } from '@/context/SettingsContext';
import { useContext } from 'react';

const useTasksSettingsContext = () => {
	const context = useContext(SettingsContext);

	if (!context) {
		throw new Error(
			'useTasksSettingsContext must be wrapped within TasksSettingsContextProvider.',
		);
	}

	return context;
};

export default useTasksSettingsContext;
