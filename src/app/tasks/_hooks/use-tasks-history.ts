import { useContext } from 'react';
import { TasksHistoryContext } from '../_context/tasks-history-context';

const useTasksHistory = () => {
	const context = useContext(TasksHistoryContext);

	if (!context) {
		throw new Error(
			'useTasksHistory must be used within TasksHistoryContextProvider',
		);
	}

	return context;
};

export default useTasksHistory;
