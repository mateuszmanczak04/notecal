import { SettingsContext } from '@/context/SettingsContext';
import { useContext } from 'react';

const useTasksContext = () => {
	const context = useContext(SettingsContext);

	if (!context) {
		throw new Error(
			'useTasksContext must be wrapped within TasksContextProvider.',
		);
	}

	return context;
};

export default useTasksContext;
