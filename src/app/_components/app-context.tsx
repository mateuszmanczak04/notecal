'use client';

import { Course, Note, Task } from '@prisma/client';
import { createContext, ReactNode, useContext, useState } from 'react';
import createNoteServer, { T_CreateNoteInput } from '../notes/_actions/create-note';
import getNotes from '../notes/_actions/get-notes';

type AppContextProps = {
	tasks: Task[];
	courses: Course[];
	notes: Note[];
	createNote: (values: T_CreateNoteInput) => Promise<void>;
};

const AppContext = createContext({} as AppContextProps);

/**
 * A hook used to get tasks, courses and notes. It is initiated from initial fetch in root layout.
 */
export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) throw new Error('useAppContext must be wrapperd with AppContextProvider');
	return context;
};

type AppContextProviderProps = {
	initialTasks: Task[];
	initialCourses: Course[];
	initialNotes: Note[];
	children: ReactNode;
};

const AppContextProvider = ({ initialTasks, initialCourses, initialNotes, children }: AppContextProviderProps) => {
	const [notes, setNotes] = useState<Note[]>(initialNotes);

	/** Fetches notes from backend and replaces current notes with fresh ones. */
	const refetchNotes = async () => {
		const freshNotes = await getNotes();
		setNotes(freshNotes);
	};

	/** Creates a new note in db and refetches notes to be fresh. */
	const createNote = async (values: T_CreateNoteInput) => {
		const res = await createNoteServer(values);
		await refetchNotes();
	};

	return (
		<AppContext value={{ tasks: initialTasks, courses: initialCourses, notes, createNote }}> {children}</AppContext>
	);
};

export default AppContextProvider;
