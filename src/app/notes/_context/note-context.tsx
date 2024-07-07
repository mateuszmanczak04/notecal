'use client';

import useCourses from '@/app/courses/_hooks/use-courses';
import useNotes from '@/app/notes/_hooks/use-notes';
import useTasks from '@/app/tasks/_hooks/use-tasks';
import { Course, Note, Task } from '@prisma/client';
import { useParams, useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext } from 'react';
import ErrorMessage from '@/components/common/error-message';
import LoadingSpinner from '@/components/common/loading-spinner';

interface NoteContextProps {
	currentNote: Note;
	course: Course;
	notes: Note[];
	tasks: Task[];
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
	const { tasks, isPending: tasksIsPending, error: tasksError } = useTasks();

	if (notesIsPending || coursesIsPending || tasksIsPending) {
		return <LoadingSpinner />;
	}

	if (notesError) {
		return <ErrorMessage>{notesError.message}</ErrorMessage>;
	}

	if (coursesError) {
		return <ErrorMessage>{coursesError.message}</ErrorMessage>;
	}

	if (tasksError) {
		return <ErrorMessage>{tasksError.message}</ErrorMessage>;
	}

	const currentCourse = courses?.find(course => course.id === courseId);
	if (!currentCourse) {
		router.push('/courses');
		return;
	}

	const thisCourseNotes = notes?.filter(note => note.courseId === courseId);
	const thisCourseTasks = tasks?.filter(task => task.courseId === courseId);

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
				tasks: thisCourseTasks || [],
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
