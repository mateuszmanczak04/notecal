import React, { createContext, use, useState } from 'react';
import { T_Note } from '../../../../../types';

type T_ContextResult = {
	selectedNotes: T_Note[];
	selectNote: (note: T_Note) => void;
	deselectNote: (note: T_Note) => void;
	deselectAll: () => void;
	isNoteSelected: (note: T_Note) => boolean;
};

const SelectNotesContext = createContext<T_ContextResult>({
	selectedNotes: [],
	selectNote: () => {},
	deselectNote: () => {},
	deselectAll: () => {},
	isNoteSelected: () => false,
});

export const SelectNotesProvider = ({ children }: { children: React.ReactNode }) => {
	const [selectedNotes, setSelectedNotes] = useState<T_Note[]>([]);

	const selectNote = (note: T_Note) => {
		setSelectedNotes(prev => [...prev, note]);
	};

	const deselectNote = (note: T_Note) => {
		setSelectedNotes(prev => prev.filter(n => n.id !== note.id));
	};

	const deselectAll = () => {
		setSelectedNotes([]);
	};

	const isNoteSelected = (note: T_Note) => selectedNotes.some(n => n.id === note.id);

	return (
		<SelectNotesContext.Provider value={{ selectNote, deselectAll, deselectNote, selectedNotes, isNoteSelected }}>
			{children}
		</SelectNotesContext.Provider>
	);
};

export const useSelectedNotes = () => {
	return use(SelectNotesContext);
};
