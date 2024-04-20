'use client';

import { getTasks } from '@/actions/get-tasks';
import { Task } from '@/types';
import { ReactNode, createContext, useEffect, useState } from 'react';

interface TasksContextProps {
	tasks: Task[];
	isLoading: boolean;
	orderByTitle: () => void;
	orderByCreationDate: () => void;
	orderByCompleted: () => void;
}

export const TasksContext = createContext<TasksContextProps>(
	{} as TasksContextProps,
);

export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchTasks = async () => {
			const res = await getTasks();
			if (res.tasks) {
				setTasks(res.tasks);
				setIsLoading(false);
			}
		};

		fetchTasks();
	}, []);

	const orderByCompleted = () => {
		setTasks(prev =>
			prev.toSorted((a, b) => {
				if (a.completed && !b.completed) {
					return -1;
				}
				if (!a.completed && b.completed) {
					return 1;
				}
				return 0;
			}),
		);
	};

	const orderByCreationDate = () => {
		setTasks(prev =>
			prev.toSorted((a, b) => {
				if (a.createdAt > b.createdAt) {
					return -1;
				}
				if (a.createdAt < b.createdAt) {
					return 1;
				}
				return 0;
			}),
		);
	};

	const orderByTitle = () => {
		setTasks(prev =>
			prev.toSorted((a, b) => {
				if (a.title > b.title) {
					return 1;
				}
				if (a.title < b.title) {
					return -1;
				}
				return 0;
			}),
		);
	};

	return (
		<TasksContext.Provider
			value={{
				tasks,
				isLoading,
				orderByCompleted,
				orderByCreationDate,
				orderByTitle,
			}}>
			{children}
		</TasksContext.Provider>
	);
};
