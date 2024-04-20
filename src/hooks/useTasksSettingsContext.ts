import { TasksSettingsContext } from '@/context/TasksSettingsContext';
import { useContext } from 'react';

const useTasksSettingsContext = () => {
	const context = useContext(TasksSettingsContext);

	if (!context) {
		throw new Error(
			'useTasksSettingsContext must be wrapped within TasksSettingsContextProvider.',
		);
	}

	return context;
};

export default useTasksSettingsContext;
