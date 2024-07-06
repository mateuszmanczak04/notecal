import React from 'react';
import { NoteContextProvider } from './_context/note-context';

const layout = ({ children }: { children: React.ReactNode }) => {
	return <NoteContextProvider>{children}</NoteContextProvider>;
};

export default layout;
