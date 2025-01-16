'use client';

import { useUser } from '@/hooks/use-user';
import { addDays, addMonths } from 'date-fns';
import { Dispatch, ReactNode, RefObject, SetStateAction, createContext, useContext, useRef, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type T_ViewMode = 'month' | 'days' | 'list';
type T_ZoomLevel = 1 | 2 | 3 | 4 | 5;

type CalendarContextProps = {
	containerRef: RefObject<HTMLElement | null>;

	firstCalendarDay: Date;

	goDayForward: () => void;
	goDayBackward: () => void;
	goMonthForward: () => void;
	goMonthBackward: () => void;
	goToToday: () => void;
	goToDay: (date: Date) => void;
	getDayAfter: (days: number) => Date;

	zoomLevel: T_ZoomLevel;
	zoomIn: () => void;
	zoomOut: () => void;

	scrollTop: number;
	setScrollTop: (newValue: number) => void;

	hiddenCoursesIds: string[];
	handleHideCourse: (id: string) => void;
	handleShowCourse: (id: string) => void;

	viewMode: T_ViewMode;
	setViewMode: Dispatch<SetStateAction<T_ViewMode>>;
};

const CalendarContext = createContext({} as CalendarContextProps);

export const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
	// TODO: load these values before rendering the app
	const [viewMode, setViewMode] = useLocalStorage<T_ViewMode>('viewMode', 'days', { initializeWithValue: false });
	const [zoomLevel, setZoomLevel] = useLocalStorage<T_ZoomLevel>('zoomLevel', 1, {
		initializeWithValue: false,
		deserializer: (value: string) => parseInt(value) as T_ZoomLevel,
		serializer: (value: T_ZoomLevel) => value.toString(),
	});
	const [firstCalendarDay, setFirstCalendarDay] = useLocalStorage<Date>('firstCalendarDay', new Date(), {
		initializeWithValue: false,
		deserializer: (value: string) => new Date(value),
		serializer: (value: Date) => value.toString(),
	});
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

	/**
	 * Returns a date object which is X days after "firstCalendarDay"
	 */
	const getDayAfter = (days: number) => {
		return addDays(firstCalendarDay, days);
	};

	/**
	 * Changes the first seen day by 1 day forward.
	 */
	const goDayForward = () => {
		setFirstCalendarDay(prev => addDays(prev, 1));
	};

	/**
	 * Changes the first seen day by 1 day back.
	 */
	const goDayBackward = () => {
		setFirstCalendarDay(prev => addDays(prev, -1));
	};

	/**
	 * Changes the first seen day by 1 day forward.
	 */
	const goMonthForward = () => {
		setFirstCalendarDay(prev => addMonths(prev, 1));
	};

	/**
	 * Changes the first seen day by 1 day back.
	 */
	const goMonthBackward = () => {
		setFirstCalendarDay(prev => addMonths(prev, -1));
	};

	/**
	 * Changes the first seen day to today.
	 */
	const goToToday = () => {
		setFirstCalendarDay(new Date());
	};

	/**
	 * Changes the first seen day to the provided date.
	 */
	const goToDay = (date: Date) => {
		setFirstCalendarDay(date);
	};

	/**
	 * Increase user's setting "zoomLevel" if it is <= 5.
	 * Maximum possible value is 5.
	 */
	const zoomIn = () => {
		setZoomLevel(prev => (prev === 5 ? 5 : ((prev + 1) as T_ZoomLevel)));
	};

	/**
	 * Decrease user's setting "zoomLevel" if it is > 1.
	 * Minimum possible value is 1.
	 */
	const zoomOut = () => {
		setZoomLevel(prev => (prev === 1 ? 1 : ((prev - 1) as T_ZoomLevel)));
	};

	return (
		<CalendarContext.Provider
			value={{
				containerRef,
				viewMode,
				setViewMode,
				firstCalendarDay,
				goDayForward,
				goDayBackward,
				goMonthForward,
				goMonthBackward,
				goToToday,
				goToDay,
				zoomIn,
				zoomOut,
				getDayAfter,
				scrollTop,
				setScrollTop,
				hiddenCoursesIds,
				handleHideCourse,
				handleShowCourse,
				zoomLevel,
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
