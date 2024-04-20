'use client';

import { ReactNode, createContext } from 'react';

export const TasksContext = createContext(null);

export const TasksContextProvider = ({ children }: { children: ReactNode }) => {
	return <TasksContext.Provider value={null}>{children}</TasksContext.Provider>;
};
