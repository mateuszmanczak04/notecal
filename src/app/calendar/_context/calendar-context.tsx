'use client';

import createNote from '@/app/notes/_actions/create-note';
import { Note } from '@prisma/client';
import { useMutation } from '@tanstack/react-query';
import { ReactNode, createContext, useContext, useRef, useState } from 'react';
import LoadingSpinner from '@/components/common/loading-spinner';
import ErrorMessage from '@/components/common/error-message';
import LocalNotes from '@/lib/local-notes';
import useNotes from '@/app/notes/_hooks/use-notes';

interface CalendarContextProps {
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
	getDayAfter: (days: number) => Date;
}

const CalendarContext = createContext({} as CalendarContextProps);

export const CalendarContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [currentFirstDay, setCurrentFirstDay] = useState(new Date());

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
		onMutate: async ({
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
			const newTemporaryNote = {
				courseId,
				content,
				startTime,
				// TODO: default duration of new notes should be taken from settings
				endTime: new Date(startTime.getTime() + 60 * 60 * 1000),
				id: newNoteTempId.current,
				userId: '',
			};
			await LocalNotes.append(newTemporaryNote);
		},
		onSuccess: async data => {
			if (!data.newNote) {
				return;
			}
			await LocalNotes.update(newNoteTempId.current, data.newNote);
		},
		onError: async () => {
			// TODO: display some kind of error message, maybe as a toast
			await LocalNotes.remove(newNoteTempId.current);
		},
	});

	// Returns a date object which is X days after "currentFirstDay"
	const getDayAfter = (days: number) => {
		return new Date(currentFirstDay.getTime() + days * 24 * 60 * 60 * 1000);
	};

	const goDayForward = () => {
		setCurrentFirstDay(getDayAfter(1));
	};

	const goDayBackward = () => {
		setCurrentFirstDay(getDayAfter(-1));
	};

	return (
		<CalendarContext.Provider
			value={{
				currentFirstDay,
				goDayForward,
				goDayBackward,
				addNewNote,
				newNoteTempId: newNoteTempId.current,
				getDayAfter,
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
