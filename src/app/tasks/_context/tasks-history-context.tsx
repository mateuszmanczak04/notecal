import { OrderTasksEnum, TaskPriority } from '@prisma/client';
import React, { createContext, useState } from 'react';
import useTasks from '../_hooks/use-tasks';

type SortParams = {
	type: 'sort';
	old: OrderTasksEnum;
	new: OrderTasksEnum;
};

type CreateParams = {
	type: 'create';
	taskId: string;
	dueDate: Date | null;
	title: string;
	description: string;
	completed: boolean;
	courseId: string | null;
	priority: TaskPriority | null;
};

// We need all properties to restore task after "redo"
type DeleteParams = {
	type: 'delete';
	taskId: string;
	dueDate: Date | null;
	title: string;
	description: string;
	completed: boolean;
	courseId: string | null;
	priority: TaskPriority | null;
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
	| CreateParams
	| DeleteParams
	| UpdateParams<'completed', boolean>
	| UpdateParams<'title' | 'courseId' | 'description', string>
	| UpdateParams<'dueDate', Date | null>
	| UpdateParams<'priority', TaskPriority | null>;

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
	// Index always points a the lastest finished update
	const [index, setIndex] = useState(0);
	const [updates, setUpdates] = useState<ChangeParams[]>([]);
	const { add, sort, update, remove } = useTasks();

	const makeUpdate = (params: ChangeParams) => {
		// If there are updates to redo and user makes another
		// change, they are forgotten
		if (index === updates.length - 1) {
			setUpdates(prev => [...prev, params]);
		} else {
			setUpdates(prev => [...prev.slice(0, index), params]);
		}

		setIndex(prev => prev + 1);
	};

	// Does a reversed action to the latest one
	const undo = () => {
		const latestUpdate = updates[index];
		setIndex(prev => prev - 1);

		switch (latestUpdate.type) {
			case 'create':
				remove(latestUpdate.taskId);
				return;
			case 'delete':
				add({
					courseId: latestUpdate.courseId,
					description: latestUpdate.description,
					dueDate: latestUpdate.dueDate,
					priority: latestUpdate.priority,
					title: latestUpdate.title,
					completed: latestUpdate.completed,
					id: latestUpdate.taskId,
				});
				return;
			case 'update':
				update({
					id: latestUpdate.taskId,
					[latestUpdate.property]: latestUpdate.oldValue,
				});
				return;
			case 'sort':
				sort(latestUpdate.old);
				return;
			default:
				return;
		}
	};

	const redo = () => {
		if (index === updates.length - 1) {
			// There is no action to redo
			return;
		}

		const updateToRestore = updates[index + 1];
		setIndex(prev => prev + 1);

		switch (updateToRestore.type) {
			case 'create':
				add({
					courseId: updateToRestore.courseId,
					description: updateToRestore.description,
					dueDate: updateToRestore.dueDate,
					priority: updateToRestore.priority,
					title: updateToRestore.title,
					completed: updateToRestore.completed,
					id: updateToRestore.taskId,
				});
				return;
			case 'delete':
				remove(updateToRestore.taskId);
				return;
			case 'update':
				update({
					id: updateToRestore.taskId,
					[updateToRestore.property]: updateToRestore.newValue,
				});
				return;
			case 'sort':
				sort(updateToRestore.new);
				return;
			default:
				return;
		}
	};

	return (
		<TasksHistoryContext.Provider
			value={{ undo, redo, change: makeUpdate }}>
			{children}
		</TasksHistoryContext.Provider>
	);
};

export default TasksHistoryContextProvider;
