'use client';

import { useUser } from '@/hooks/use-user';
import { ReactNode, RefObject, createContext, useContext, useRef, useState } from 'react';

type CalendarContextProps = {
	containerRef: RefObject<HTMLElement | null>;
	scrollTop: number;
	setScrollTop: (newValue: number) => void;
	hiddenCoursesIds: string[];
	handleHideCourse: (id: string) => void;
	handleShowCourse: (id: string) => void;
};

const CalendarContext = createContext({} as CalendarContextProps);

export const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
	const containerRef = useRef<HTMLElement | null>(null);
	const { data: user } = useUser();
	// Used when filtering courses, only courses in this array are visible
	const [hiddenCoursesIds, setHiddenCoursesIds] = useState<string[]>([]);

	// Needed to keep the same calendar scroll y level after switching routes
	const [scrollTop, setScrollTop] = useState(0);

	if (!user) return null; // TOOD: handle this

	/**
	 * Adds course id to the hidden courses array to stop
	 * displaying it in the calendar grid.
	 */
	const handleHideCourse = (id: string) => {
		if (hiddenCoursesIds.includes(id)) return;
		setHiddenCoursesIds(prev => [...prev, id]);
	};

	/**
	 * Removes course id from the hidden courses array to
	 * recover it in calendar grid.
	 */
	const handleShowCourse = (id: string) => {
		setHiddenCoursesIds(prev => prev.filter(c => c !== id));
	};

	return (
		<CalendarContext.Provider
			value={{
				containerRef,
				scrollTop,
				setScrollTop,
				hiddenCoursesIds,
				handleHideCourse,
				handleShowCourse,
			}}>
			{children}
		</CalendarContext.Provider>
	);
};

export const useCalendarContext = () => {
	const context = useContext(CalendarContext);
	if (!context) {
		throw new Error('useCalendarContext must be wrapped within CalendarContextProvider!');
	}
	return context;
};
