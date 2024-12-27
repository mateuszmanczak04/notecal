'use client';

import { useUser } from '@/app/_hooks/use-user';
import updateSettings from '@/app/settings/_actions/update-settings';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addDays } from 'date-fns';
import { ReactNode, RefObject, createContext, useContext, useRef, useState } from 'react';

type CalendarContextProps = {
	currentFirstDay: Date;
	goDayForward: () => void;
	goDayBackward: () => void;
	getDayAfter: (days: number) => Date;
	containerRef: RefObject<HTMLDivElement | null>;
	getRelativePosition: (x: number, y: number) => { x: number | null; y: number | null };
	getDateFromPosition: (x: number, y: number) => Date | null;
	rowHeight: number;
	zoomIn: () => void;
	zoomOut: () => void;
	scrollTop: number;
	setScrollTop: (newValue: number) => void;
};

const CalendarContext = createContext({} as CalendarContextProps);

export const CalendarContextProvider = ({ children }: { children: ReactNode }) => {
	const [currentFirstDay, setCurrentFirstDay] = useState(new Date());
	const containerRef = useRef<HTMLDivElement | null>(null);

	const queryClient = useQueryClient();
	const { data: user } = useUser();
	const { mutate } = useMutation({
		mutationFn: updateSettings,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
	});

	// Needed to keep the same calendar scroll y level after switching routes
	const [scrollTop, setScrollTop] = useState(0);

	if (!user) return null; // TOOD: handle this

	/**
	 * Returns a date object which is X days after "currentFirstDay"
	 */
	const getDayAfter = (days: number) => {
		return new Date(currentFirstDay.getTime() + days * 24 * 60 * 60 * 1000);
	};

	/**
	 * Changes the first seen day by 1 day forward.
	 */
	const goDayForward = () => {
		setCurrentFirstDay(getDayAfter(1));
	};

	/**
	 * Changes the first seen day by 1 day back.
	 */
	const goDayBackward = () => {
		setCurrentFirstDay(getDayAfter(-1));
	};

	/**
	 * Returns a relative position to grid container (in pixels) and null when position is beyond the container.
	 */
	const getRelativePosition = (x: number, y: number) => {
		if (!containerRef.current) return { x: null, y: null };

		const { x: containerLeft, y: containerTop, width, height } = containerRef.current.getBoundingClientRect();

		const relativeX = x - containerLeft;
		const relativeY = y - containerTop;

		// Case when position is beyond the container bounding box
		if (relativeX < 0 || relativeY < 0 || relativeX > width || relativeY > height) {
			return { x: null, y: null };
		}

		return { x: relativeX, y: relativeY };
	};

	/**
	 * Get day and time from relative position, round to 15 minutes.
	 * Arguments passed here are usually results of "getRelativePosition()".
	 */
	const getDateFromPosition = (x: number, y: number) => {
		if (!containerRef.current) return null;

		const { width, height } = containerRef.current.getBoundingClientRect();

		// Get day (YYYY-MM-DD):
		const columnWidth = width / user.displayedDays;
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
		time.setSeconds(0);
		time.setMilliseconds(0);

		return time;
	};

	/**
	 * Returns height of the calendar hour row in pixels. It's based on user's setting "zoomLevel".
	 */
	const getRowHeight = () => {
		switch (user.zoomLevel) {
			case 1:
				return 40;
			case 2:
				return 60;
			case 3:
				return 80;
			case 4:
				return 120;
			case 5:
				return 160;
			default:
				return 80;
		}
	};

	/**
	 * Increase user's setting "zoomLevel" if it is <= 5.
	 * Maximum possible value is 5.
	 */
	const zoomIn = () => {
		if (user.zoomLevel !== 5) {
			mutate({
				zoomLevel: (user.zoomLevel + 1) as 1 | 2 | 3 | 4 | 5,
			});
		}
	};

	/**
	 * Decrease user's setting "zoomLevel" if it is > 1.
	 * Minimum possible value is 1.
	 */
	const zoomOut = () => {
		if (user.zoomLevel > 1) {
			mutate({
				zoomLevel: (user.zoomLevel - 1) as 1 | 2 | 3 | 4 | 5,
			});
		}
	};

	return (
		<CalendarContext.Provider
			value={{
				containerRef,
				currentFirstDay,
				goDayForward,
				goDayBackward,
				rowHeight: getRowHeight(),
				zoomIn,
				zoomOut,
				getDayAfter,
				getRelativePosition,
				getDateFromPosition,
				scrollTop,
				setScrollTop,
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
