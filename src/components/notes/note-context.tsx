import { getCourse } from '@/actions/courses/get-course';
import { getCourseNotes } from '@/actions/courses/get-course-notes';
import { getCourseTasks } from '@/actions/courses/get-course-tasks';
import { getNote } from '@/actions/notes/get-note';
import { Course, Note, Task } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ReactNode, createContext, useContext } from 'react';

interface NoteContextProps {
	note: Note;
	noteIsLoading: boolean;
	course: Course;
	courseIsLoading: boolean;
	notes?: Note[];
	notesError?: string;
	notesIsLoading: boolean;
	tasks?: Task[];
	tasksError?: string;
	tasksIsLoading: boolean;
}

const NoteContext = createContext({} as NoteContextProps);

export const NoteContextProvider = ({ children }: { children: ReactNode }) => {
	const { id, courseId } = useParams();

	// get note from db
	const { data: noteData, isLoading: noteIsLoading } = useQuery({
		enabled: !!id,
		queryFn: async () => getNote({ id: id as string }),
		queryKey: ['note', id],
	});

	// get course from db
	const { data: courseData, isLoading: courseIsLoading } = useQuery({
		enabled: !!courseId,
		queryFn: async () => await getCourse({ courseId: courseId as string }),
		queryKey: ['course', courseId],
	});

	// get course notes from db
	const { data: notesData, isLoading: notesIsLoading } = useQuery({
		enabled: !!courseId,
		queryFn: async () => await getCourseNotes({ courseId: courseId as string }),
		queryKey: ['course-notes', courseId],
	});

	// note course tasks from db
	const { data: tasksData, isLoading: tasksIsLoading } = useQuery({
		enabled: !!courseId,
		queryFn: async () => await getCourseTasks({ courseId: courseId as string }),
		queryKey: ['course-tasks', courseId],
	});

	if (courseIsLoading || noteIsLoading) {
		return <p className='animate-bounce'>Loading...</p>;
	}

	if (
		!noteData?.note ||
		!courseData?.course ||
		noteData.error ||
		courseData.error
	) {
		return (
			<p className='rounded-md bg-red-100 p-2 text-red-800'>
				Note or course not found
			</p>
		);
	}

	return (
		<NoteContext.Provider
			value={{
				note: noteData.note,
				noteIsLoading,
				course: courseData.course,
				courseIsLoading,
				notes: notesData?.notes,
				notesError: notesData?.error,
				notesIsLoading,
				tasks: tasksData?.tasks,
				tasksError: tasksData?.error,
				tasksIsLoading,
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
