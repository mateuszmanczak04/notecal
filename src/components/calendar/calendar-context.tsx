import { createNewNote } from '@/actions/notes/create-new-note';
import { getNotes } from '@/actions/notes/get-notes';
import { Note } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ReactNode, createContext, useContext, useState } from 'react';

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

	const { mutate: addNewNote } = useMutation({
		mutationFn: async ({
			courseId,
			content,
			startTime,
		}: {
			courseId: string;
			content: string;
			startTime: Date;
		}) => await createNewNote({ courseId, content, startTime }),
		onMutate: ({
			courseId,
			content,
			startTime,
		}: {
			courseId: string;
			content: string;
			startTime: Date;
		}) => {
			queryClient.setQueryData(['notes'], (prev: { notes: Note[] }) => {
				return {
					notes: [
						...prev.notes,
						{
							courseId,
							content,
							startTime,
							endTime: new Date(startTime.getTime() + 24 * 60 * 60 * 1000),
							id: Math.random().toString(),
						},
					],
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

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (notesData?.error) {
		return (
			<p className='rounded-md bg-red-100 p-2 text-red-800'>
				{notesData?.error}
			</p>
		);
	}

	return (
		<CalendarContext.Provider
			value={{
				notes: notesData!.notes!,
				currentFirstDay,
				goDayForward,
				goDayBackward,
				addNewNote,
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
