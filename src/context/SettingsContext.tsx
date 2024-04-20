import { ReactNode, createContext } from 'react';

export const SettingsContext = createContext(null);

export const SettingsContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	return (
		<SettingsContext.Provider value={null}>{children}</SettingsContext.Provider>
	);
};
