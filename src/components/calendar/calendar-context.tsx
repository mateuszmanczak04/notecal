import { getNotes } from '@/actions/notes/get-notes';
import { Note } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { ReactNode, createContext, useContext, useState } from 'react';

interface CalendarContextProps {
	notes: Note[];
	currentFirstDay: Date;
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
			value={{ notes: notesData!.notes!, currentFirstDay }}>
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
