import { TasksContext } from '@/context/TasksContext';
import { useContext } from 'react';

const useTasksContext = () => {
	const context = useContext(TasksContext);

	if (!context) {
		throw new Error(
			'useTasksContext must be wrapped within TasksContextProvider.',
		);
	}

	return context;
};

export default useTasksContext;
