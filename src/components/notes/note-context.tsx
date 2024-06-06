import useCourses from '@/hooks/use-courses';
import useNotes from '@/hooks/use-notes';
import useTasks from '@/hooks/use-tasks';
import { Course, Note, Task } from '@prisma/client';
import { useParams } from 'next/navigation';
import { ReactNode, createContext, useContext } from 'react';
import ErrorMessage from '@/components/error-message';

interface NoteContextProps {
	currentNote: Note;
	course: Course;
	notes: Note[];
	tasks: Task[];
}

const NoteContext = createContext({} as NoteContextProps);

export const NoteContextProvider = ({ children }: { children: ReactNode }) => {
	const { id, courseId } = useParams();

	const { notes } = useNotes();
	const { courses } = useCourses();
	const { tasks } = useTasks();

	// todo:
	// - filter courses to get relevant
	// - filter notes to get all relevant to this course
	// - filter tasks to get relevant to this course
	// - handle loading and error states
	// - create hooks for filtering notes, courses and tasks

	const currentNote = notes?.filter(note => note.id === id)[0];
	if (!currentNote) {
		// todo - add home page button
		return <ErrorMessage>Note not found</ErrorMessage>;
	}

	const currentCourse = courses?.find(course => course.id === courseId);
	if (!currentCourse) {
		// todo - add home page button
		return <ErrorMessage>Course not found</ErrorMessage>;
	}

	if (!tasks) {
		// todo - add home page button
		return <ErrorMessage>Tasks not found</ErrorMessage>;
	}

	return (
		<NoteContext.Provider
			value={{
				currentNote,
				course: currentCourse,
				notes: notes.filter(note => note.courseId === courseId),
				tasks: tasks.filter(task => task.courseId === courseId),
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
