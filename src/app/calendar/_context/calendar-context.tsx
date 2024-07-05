import createNote from '@/app/notes/_actions/create-note';
import getNotes from '@/app/notes/_actions/get-notes';
import { Note } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactNode, createContext, useContext, useRef, useState } from 'react';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';

interface CalendarContextProps {
	notes: Note[];
	currentFirstDay: Date;
	goDayForward: () => void;
	goDayBackward: () => void;
	addNewNote: ({
		courseId,
		content,
		startTime,
	}: {
		courseId: string;
		content: string;
		startTime: Date;
	}) => void;
	newNoteTempId: string | null;
}

const CalendarContext = createContext({} as CalendarContextProps);

export const CalendarContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const { data: notesData, isLoading } = useQuery({
		queryFn: async () => await getNotes(),
		queryKey: ['notes'],
	});
	const [currentFirstDay, setCurrentFirstDay] = useState(new Date());
	const queryClient = useQueryClient();

	const newNoteTempId = useRef<string>('new-note-temp-id');

	const { mutate: addNewNote } = useMutation({
		mutationFn: async ({
			courseId,
			content,
			startTime,
		}: {
			courseId: string;
			content: string;
			startTime: Date;
		}) => await createNote({ courseId, content, startTime }),
		onMutate: ({
			courseId,
			content,
			startTime,
		}: {
			courseId: string;
			content: string;
			startTime: Date;
		}) => {
			// create a new note with fake temporary id and update that id
			// when server returns a response with the new task in "onSuccess"
			// callback
			queryClient.setQueryData(['notes'], (prev: { notes: Note[] }) => {
				return {
					notes: [
						...prev.notes,
						{
							courseId,
							content,
							startTime,
							// default duration of newly created notes: 1h
							endTime: new Date(startTime.getTime() + 60 * 60 * 1000),
							id: newNoteTempId.current,
						},
					],
				};
			});
		},
		onSuccess(data) {
			if (!data.newNote) {
				return;
			}
			const newNote = data.newNote;
			queryClient.setQueryData(['notes'], (prev: { notes: Note[] }) => {
				return {
					notes: prev.notes.map(note =>
						note.id === newNoteTempId.current
							? { ...note, id: newNote.id }
							: note,
					),
				};
			});
		},
		onError() {
			// simply remove a newly created note without showing any error
			// todo - display some kind of error message, maybe as a toast or sth.
			queryClient.setQueryData(['notes'], (prev: { notes: Note[] }) => {
				return {
					notes: prev.notes.filter(note => note.id !== newNoteTempId.current),
				};
			});
		},
	});

	const goDayForward = () => {
		setCurrentFirstDay(prev => {
			const newDate = new Date();
			newDate.setTime(prev.getTime() + 24 * 60 * 60 * 1000);
			return newDate;
		});
	};

	const goDayBackward = () => {
		setCurrentFirstDay(prev => {
			const newDate = new Date();
			newDate.setTime(prev.getTime() - 24 * 60 * 60 * 1000);
			return newDate;
		});
	};

	if (isLoading) return <LoadingSpinner />;

	if (notesData?.error) {
		return <ErrorMessage>{notesData?.error}</ErrorMessage>;
	}

	return (
		<CalendarContext.Provider
			value={{
				notes: notesData!.notes!,
				currentFirstDay,
				goDayForward,
				goDayBackward,
				addNewNote,
				newNoteTempId: newNoteTempId.current,
			}}>
			{children}
		</CalendarContext.Provider>
	);
};

export const useCalendarContext = () => {
	const context = useContext(CalendarContext);
	if (!context) {
		throw new Error(
			'useCalendarContext must be wrapped within CalendarContextProvider!',
		);
	}
	return context;
};
