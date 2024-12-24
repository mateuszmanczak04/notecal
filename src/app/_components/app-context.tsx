'use client';

import { Course, Note, Task } from '@prisma/client';
import { createContext, ReactNode, useContext } from 'react';

type AppContextProps = {
	tasks: Task[];
	courses: Course[];
	notes: Note[];
};

const AppContext = createContext({ tasks: [], courses: [], notes: [] } as AppContextProps);

/**
 * A hook used to get tasks, courses and notes. It is initiated from initial fetch in root layout.
 */
export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) throw new Error('useAppContext must be wrapperd with AppContextProvider');
	return context;
};

type AppContextProviderProps = {
	tasks: Task[];
	courses: Course[];
	notes: Note[];
	children: ReactNode;
};

const AppContextProvider = ({ tasks, courses, notes, children }: AppContextProviderProps) => {
	return <AppContext value={{ tasks, courses, notes }}> {children}</AppContext>;
};

export default AppContextProvider;
