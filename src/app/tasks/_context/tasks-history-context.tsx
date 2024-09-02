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
	id: string;
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
	id: string;
	dueDate: Date | null;
	title: string;
	description: string;
	completed: boolean;
	courseId: string | null;
	priority: TaskPriority | null;
};

type UpdateParams<T, V> = {
	type: 'update';
	id: string;
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
	makeUpdate: (params: ChangeParams) => void;
};

export const TasksHistoryContext = createContext({} as Props);

const TasksHistoryContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	// Index always points a the lastest finished update
	const [index, setIndex] = useState(-1);
	const [updates, setUpdates] = useState<ChangeParams[]>([]);
	const { add, sort, update, remove } = useTasks();

	// TODO: optimize this
	// Right now user cannot undo task creation until the
	// task has been fully created
	// It's because it doesn't exist in database yet
	// Option I: remove from local state immediately and add to queue
	// to do in the database

	const makeUpdate = (params: ChangeParams) => {
		// If there are updates to redo and user makes another
		// change, they are forgotten
		if (index === updates.length - 1) {
			setUpdates(prev => [...prev, params]);
		} else {
			setUpdates(prev => [...prev.slice(0, index + 1), params]);
		}

		setIndex(prev => prev + 1);
	};

	// Does a reversed action to the latest one
	const undo = () => {
		if (index === -1) return;

		const latestUpdate = updates[index];
		if (latestUpdate === undefined) return;

		setIndex(prev => prev - 1);

		switch (latestUpdate.type) {
			case 'create':
				remove(latestUpdate.id);
				return;
			case 'delete':
				add({
					courseId: latestUpdate.courseId,
					description: latestUpdate.description,
					dueDate: latestUpdate.dueDate,
					priority: latestUpdate.priority,
					title: latestUpdate.title,
					completed: latestUpdate.completed,
					id: latestUpdate.id,
				});

				return;
			case 'update':
				update({
					id: latestUpdate.id,
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
					id: updateToRestore.id,
				});
				return;
			case 'delete':
				remove(updateToRestore.id);
				return;
			case 'update':
				update({
					id: updateToRestore.id,
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
		<TasksHistoryContext.Provider value={{ undo, redo, makeUpdate }}>
			{children}
		</TasksHistoryContext.Provider>
	);
};

export default TasksHistoryContextProvider;
