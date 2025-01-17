'use client';

import { ReactNode, RefObject, createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type CalendarContextProps = {
	containerRef: RefObject<HTMLElement | null>;
	calendarScrollTop: number;
	setCalendarScrollTop: (newValue: number) => void;
	hiddenCoursesIds: string[];
	handleHideCourse: (id: string) => void;
	handleShowCourse: (id: string) => void;
};

const CalendarContext = createContext({} as CalendarContextProps);

export const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
	const containerRef = useRef<HTMLElement | null>(null);
	// Used when filtering courses, only courses in this array are visible
	const [hiddenCoursesIds, setHiddenCoursesIds] = useState<string[]>([]);

	// Needed to keep the same calendar scroll y level after switching routes
	const [calendarScrollTop, setCalendarScrollTop] = useLocalStorage<number>('calendarScrollTop', 0, {
		initializeWithValue: false,
		deserializer: (value: string) => parseInt(value),
		serializer: (value: number) => value.toString(),
	});

	/**
	 * Listens to the scroll event on the calendar container and synchronize
	 * it with localStorage to keep the same scroll position after switching routes.
	 */
	useEffect(() => {
		if (!containerRef.current) return;
		const listener = () => {
			setCalendarScrollTop(containerRef.current!.scrollTop);
		};

		containerRef.current.addEventListener('scroll', listener);

		containerRef.current.scrollTop = calendarScrollTop;

		return () => {
			if (!containerRef.current) return;
			containerRef.current.removeEventListener('scroll', listener);
		};
	}, []);

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
				calendarScrollTop: calendarScrollTop,
				setCalendarScrollTop: setCalendarScrollTop,
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
