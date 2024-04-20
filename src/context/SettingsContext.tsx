'use client';

import { TasksSettingsContextProvider } from '@/context/TasksSettingsContext';
import { ReactNode, createContext } from 'react';

export const SettingsContext = createContext(null);

export const SettingsContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	return (
		<SettingsContext.Provider value={null}>
			<TasksSettingsContextProvider>{children}</TasksSettingsContextProvider>
		</SettingsContext.Provider>
	);
};
