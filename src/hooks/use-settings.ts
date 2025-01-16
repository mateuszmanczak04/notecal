import { addDays, addMonths } from 'date-fns';
import { useLocalStorage } from 'usehooks-ts';

type T_ViewMode = 'month' | 'days' | 'list';
type T_ZoomLevel = 1 | 2 | 3 | 4 | 5;

export const useSettings = () => {
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

	const getDayAfter = (days: number) => {
		return addDays(firstCalendarDay, days);
	};

	const goDayForward = () => {
		setFirstCalendarDay(prev => addDays(prev, 1));
	};

	const goDayBackward = () => {
		setFirstCalendarDay(prev => addDays(prev, -1));
	};

	const goMonthForward = () => {
		setFirstCalendarDay(prev => addMonths(prev, 1));
	};

	const goMonthBackward = () => {
		setFirstCalendarDay(prev => addMonths(prev, -1));
	};

	const goToToday = () => {
		setFirstCalendarDay(new Date());
	};

	const goToDay = (date: Date) => {
		setFirstCalendarDay(date);
	};

	const zoomIn = () => {
		setZoomLevel(prev => (prev === 5 ? 5 : ((prev + 1) as T_ZoomLevel)));
	};

	const zoomOut = () => {
		setZoomLevel(prev => (prev === 1 ? 1 : ((prev - 1) as T_ZoomLevel)));
	};

	return {
		viewMode,
		setViewMode,
		zoomLevel,
		firstCalendarDay,
		getDayAfter,
		goDayForward,
		goDayBackward,
		goMonthForward,
		goMonthBackward,
		goToToday,
		goToDay,
		zoomIn,
		zoomOut,
	};
};
