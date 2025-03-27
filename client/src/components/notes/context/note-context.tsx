import React, { createContext } from 'react';
import { useSearchParams } from 'react-router';
import { useCourses } from '../../../hooks/use-courses';
import { useNotes } from '../../../hooks/use-notes';
import { T_Course, T_Note } from '../../../types';

type NoteContextType = {
	currentNote: T_Note | null;
	currentCourse: T_Course | null;
};

const NoteContext = createContext<NoteContextType>({
	currentNote: null,
	currentCourse: null,
});

export const NoteContextProvider = ({ children }: { children: React.ReactNode }) => {
	const [searchParams] = useSearchParams();
	const noteId = searchParams.get('noteId');
	const courseId = searchParams.get('courseId');

	const { data: notes } = useNotes();
	const { data: courses } = useCourses();

	const currentNote = notes?.find(note => note.id === noteId) || null;
	const currentCourse =
		(currentNote
			? courses?.find(course => course.id === currentNote.courseId)
			: courses?.find(course => course.id === courseId)) || null;

	return <NoteContext.Provider value={{ currentNote, currentCourse }}>{children}</NoteContext.Provider>;
};

export const useNoteContext = () => React.useContext(NoteContext);
