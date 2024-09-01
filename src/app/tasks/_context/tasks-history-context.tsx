import { OrderTasksEnum } from '@prisma/client';
import React, { createContext } from 'react';

type SortParams = {
	type: 'sort';
	old: OrderTasksEnum;
	new: OrderTasksEnum;
};

type UpdateParams<T, V> = {
	type: 'update';
	taskId: string;
	property: T;
	oldValue: V;
	newValue: V;
};

type ChangeParams =
	| SortParams
	| UpdateParams<'completed', boolean>
	| UpdateParams<'title' | 'courseId' | 'description', string>
	| UpdateParams<'dueDate', Date | null>
	| UpdateParams<'priority', 'A' | 'B' | 'C' | null>;

type Props = {
	undo: () => void;
	redo: () => void;
	change: (params: ChangeParams) => void;
};

export const TasksHistoryContext = createContext({} as Props);

const TasksHistoryContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const change = (params: ChangeParams) => {};

	const undo = () => {};

	const redo = () => {};

	return (
		<TasksHistoryContext.Provider value={{ undo, redo, change }}>
			{children}
		</TasksHistoryContext.Provider>
	);
};

export default TasksHistoryContextProvider;
