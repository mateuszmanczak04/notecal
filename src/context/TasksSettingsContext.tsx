import { ReactNode, createContext } from 'react';

export const TasksSettingsContext = createContext(null);

export const TasksSettingsContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	return (
		<TasksSettingsContext.Provider value={null}>
			{children}
		</TasksSettingsContext.Provider>
	);
};
