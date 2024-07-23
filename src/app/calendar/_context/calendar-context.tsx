'use client';

import updateSettings from '@/app/settings/_actions/update-settings';
import useSettings from '@/app/settings/_hooks/use-settings';
import LocalSettings from '@/lib/local-settings';
import { addDays } from 'date-fns';
import {
	MutableRefObject,
	ReactNode,
	createContext,
	useContext,
	useRef,
	useState,
} from 'react';

interface CalendarContextProps {
	currentFirstDay: Date;
	goDayForward: () => void;
	goDayBackward: () => void;
	getDayAfter: (days: number) => Date;
	containerRef: MutableRefObject<HTMLDivElement | null>;
	getRelativePosition: (
		x: number,
		y: number,
	) => { x: number | null; y: number | null };
	getDateFromPosition: (x: number, y: number) => Date | null;
	displayedDays: number;
	rowHeight: number;
	zoomIn: () => void;
	zoomOut: () => void;
}

const CalendarContext = createContext({} as CalendarContextProps);

export const CalendarContextProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [currentFirstDay, setCurrentFirstDay] = useState(new Date());
	const containerRef = useRef<HTMLDivElement | null>(null);

	const { settings } = useSettings();

	if (!settings) return null; // TOOD: handle this

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
		const columnWidth = width / settings.displayedDays;
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

	const getRowHeight = () => {
		switch (settings.zoomLevel) {
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

	const zoomIn = () => {
		if (settings.zoomLevel !== 5) {
			LocalSettings.update({ zoomLevel: settings.zoomLevel + 1 });
			updateSettings({ zoomLevel: settings.zoomLevel + 1 }); // TODO: error handling
		}
	};

	const zoomOut = () => {
		if (settings.zoomLevel !== 1) {
			LocalSettings.update({ zoomLevel: settings.zoomLevel - 1 });
			updateSettings({ zoomLevel: settings.zoomLevel - 1 }); // TODO: error handling
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
				displayedDays: settings.displayedDays,
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
