import React from 'react';
import { CalendarContextProvider } from './_context/calendar-context';

const layout = ({ children }: { children: React.ReactNode }) => {
	return <CalendarContextProvider>{children}</CalendarContextProvider>;
};

export default layout;
