import useCourses from '@/app/courses/_hooks/use-courses';
import useNotes from '@/app/notes/_hooks/use-notes';
import useTasks from '@/app/tasks/_hooks/use-tasks';
import { Course, Note, Task } from '@prisma/client';
import { useParams } from 'next/navigation';
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

	const { notes, isPending: notesIsPending } = useNotes();
	const { courses, isPending: coursesIsPending } = useCourses();
	const { tasks, isPending: tasksIsPending } = useTasks();

	// todo:
	// - filter courses to get relevant
	// - filter notes to get all relevant to this course
	// - filter tasks to get relevant to this course
	// - handle loading and error states
	// - create hooks for filtering notes, courses and tasks

	if (notesIsPending || coursesIsPending || tasksIsPending) {
		return <LoadingSpinner />;
	}

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
