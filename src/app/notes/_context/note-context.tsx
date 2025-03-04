'use client';

import { useCourses } from '@/hooks/use-courses';
import { useNotes } from '@/hooks/use-notes';
import { Course as T_Course, Note as T_Note } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import React, { createContext } from 'react';

type NoteContextType = {
	currentNote: T_Note | null;
	currentCourse: T_Course | null;
};

const NoteContext = createContext<NoteContextType>({
	currentNote: null,
	currentCourse: null,
});

export const NoteContextProvider = ({ children }: { children: React.ReactNode }) => {
	const searchParams = useSearchParams();
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
