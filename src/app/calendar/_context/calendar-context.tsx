'use client';

import createNote from '@/app/notes/_actions/create-note';
import { useMutation } from '@tanstack/react-query';
import {
	MutableRefObject,
	ReactNode,
	createContext,
	useContext,
	useRef,
	useState,
} from 'react';
import LocalNotes from '@/lib/local-notes';
import { addDays } from 'date-fns';

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
	containerRef: MutableRefObject<HTMLDivElement | null>;
	getRelativePosition: (
		x: number,
		y: number,
	) => { x: number | null; y: number | null };
	getDateFromPosition: (x: number, y: number) => Date | null;
	daysToSee: number;
}

const CalendarContext = createContext({} as CalendarContextProps);

export const CalendarContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [currentFirstDay, setCurrentFirstDay] = useState(new Date());
	const containerRef = useRef<HTMLDivElement | null>(null);
	const [daysToSee, setDaysToSee] = useState(5); // TODO: get it from user settings

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

	// Returns a relative position to grid container:
	const getRelativePosition = (x: number, y: number) => {
		if (!containerRef.current) return { x: null, y: null };

		const { x: containerLeft, y: containerTop } =
			containerRef.current.getBoundingClientRect();

		return { x: x - containerLeft, y: y - containerTop };
	};

	// Get day and time from relative position:
	// Round to 15 minutes
	const getDateFromPosition = (x: number, y: number) => {
		if (!containerRef.current) return null;

		const { width, height } = containerRef.current.getBoundingClientRect();

		// Get day (YYYY-MM-DD):
		const columnWidth = width / daysToSee;
		const dayIndex = Math.floor(x / columnWidth);
		const time = addDays(currentFirstDay, dayIndex);

		// Get time (HH:MM):
		const yRatio = y / height;
		const minutesIn24H = 24 * 60;
		const totalMinutes = yRatio * minutesIn24H;
		const hours = Math.floor(totalMinutes / 60);
		const minutes = Math.round((totalMinutes % 60) / 15) * 15;
		time.setHours(hours);
		time.setMinutes(minutes);

		return time;
	};

	return (
		<CalendarContext.Provider
			value={{
				containerRef,
				currentFirstDay,
				goDayForward,
				goDayBackward,
				addNewNote,
				newNoteTempId: newNoteTempId.current,
				getDayAfter,
				getRelativePosition,
				getDateFromPosition,
				daysToSee,
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
