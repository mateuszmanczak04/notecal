'use client';

import { ReactNode, createContext } from 'react';

export const CoursesContext = createContext(null);

export const CoursesContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	return (
		<CoursesContext.Provider value={null}>{children}</CoursesContext.Provider>
	);
};
