import { getCourse } from '@/actions/courses/get-course';
import { getCourseNotes } from '@/actions/courses/get-course-notes';
import { getCourseTasks } from '@/actions/courses/get-course-tasks';
import { getNote } from '@/actions/notes/get-note';
import { Course, Note, Task } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { ReactNode, createContext, useContext } from 'react';

interface NoteContextProps {
	currentNote: Note;
	course: Course;
	notes: Note[];
	tasks?: Task[];
	tasksError?: string;
	tasksIsLoading: boolean;
}

const NoteContext = createContext({} as NoteContextProps);

export const NoteContextProvider = ({ children }: { children: ReactNode }) => {
	const { id, courseId } = useParams();

	// get note from db
	// const { data: noteData, isLoading: noteIsLoading } = useQuery({
	// 	enabled: !!id,
	// 	queryFn: async () => getNote({ id: id as string }),
	// 	queryKey: ['note', id],
	// });

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

	if (courseIsLoading || notesIsLoading) {
		return <p className='animate-bounce'>Loading...</p>;
	}

	if (
		!notesData?.notes ||
		!courseData?.course ||
		notesData.error ||
		courseData.error
	) {
		return (
			<p className='rounded-md bg-red-100 p-2 text-red-800'>
				Note or course not found
			</p>
		);
	}

	const currentNote = notesData?.notes?.filter(n => n.id === id)[0];

	return (
		<NoteContext.Provider
			value={{
				currentNote,
				course: courseData.course,
				notes: notesData.notes,
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
