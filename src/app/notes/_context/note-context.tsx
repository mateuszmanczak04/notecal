'use client';

import useCourses from '@/app/courses/_hooks/use-courses';
import useNotes from '@/app/notes/_hooks/use-notes';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';
import { Course, Note } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext } from 'react';

interface NoteContextProps {
	currentNote: Note;
	course: Course;
	notes: Note[];
}

const NoteContext = createContext({} as NoteContextProps);

export const NoteContextProvider = ({ children }: { children: ReactNode }) => {
	const { id, courseId } = useParams();
	const router = useRouter();

	const { notes, isPending: notesIsPending, error: notesError } = useNotes();
	const {
		courses,
		isPending: coursesIsPending,
		error: coursesError,
	} = useCourses();

	if (notesIsPending || coursesIsPending) {
		return <LoadingSpinner />;
	}

	if (notesError) {
		return <ErrorMessage>{notesError.message}</ErrorMessage>;
	}

	if (coursesError) {
		return <ErrorMessage>{coursesError.message}</ErrorMessage>;
	}

	const currentCourse = courses?.find(course => course.id === courseId);
	if (!currentCourse) {
		router.push('/courses');
		return;
	}

	const thisCourseNotes = notes?.filter(note => note.courseId === courseId);

	const currentNote = thisCourseNotes?.filter(note => note.id === id)[0];
	if (!currentNote) {
		router.push('/courses');
		return;
	}

	return (
		<NoteContext.Provider
			value={{
				currentNote,
				course: currentCourse,
				notes: thisCourseNotes || [],
			}}>
			{children}
		</NoteContext.Provider>
	);
};

export const useNoteContext = () => {
	const context = useContext(NoteContext);
	if (!context) {
		throw new Error(
			'useNoteContext must be wrapped within NoteContextProvider!',
		);
	}
	return context;
};
