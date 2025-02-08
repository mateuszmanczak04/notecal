import { addDays, addMonths } from 'date-fns';
import { useLocalStorage } from 'usehooks-ts';

export type T_ViewMode = 'month' | 'days' | 'list';
export type T_ZoomLevel = number;
export type T_TasksOrder = 'days' | 'priority' | 'dueDate' | 'createdAt' | 'completed' | 'title' | 'custom';
export type T_DisplayedDays = 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type T_DefaultNoteDuration = number;
export type T_Language = 'en';
export type T_SidebarElements = {
	courseRelated: boolean;
	notesList: boolean;
	usefulLinks: boolean;
	tasks: boolean;
	noteRelated: boolean;
	dangerZone: boolean;
	settings: boolean;
};
export type T_NoteAutoSave = boolean;
export type T_MaxNoteWidthEnabled = boolean;

export const useSettings = () => {
	// TODO: load these values before rendering the app
	const [viewMode, setViewMode] = useLocalStorage<T_ViewMode>('viewMode', 'days', { initializeWithValue: false });
	const [language, setLanguage] = useLocalStorage<T_Language>('language', 'en', { initializeWithValue: false });
	const [tasksOrder, setTasksOrder] = useLocalStorage<T_TasksOrder>('tasksOrder', 'createdAt', {
		initializeWithValue: false,
	});
	const [zoomLevel, setZoomLevel] = useLocalStorage<T_ZoomLevel>('zoomLevel', 1, {
		initializeWithValue: false,
		deserializer: (value: string) => parseInt(value),
		serializer: (value: T_ZoomLevel) => value.toString(),
	});
	const [displayedDays, setDisplayedDays] = useLocalStorage<T_DisplayedDays>('displayedDays', 5, {
		initializeWithValue: false,
		deserializer: (value: string) => parseInt(value) as T_DisplayedDays,
		serializer: (value: T_DisplayedDays) => value.toString(),
	});
	const [defaultNoteDuration, setDefaultNoteDuration] = useLocalStorage<T_DefaultNoteDuration>(
		'defaultNoteDuration',
		60,
		{
			initializeWithValue: false,
			deserializer: (value: string) => parseInt(value) as T_DefaultNoteDuration,
			serializer: (value: T_DefaultNoteDuration) => value.toString(),
		},
	);
	const [noteAutoSave, setNoteAutoSave] = useLocalStorage<T_NoteAutoSave>('noteAutoSave', false, {
		initializeWithValue: false,
		deserializer: (value: string) => value === 'true',
		serializer: (value: T_NoteAutoSave) => value.toString(),
	});
	const [maxNoteWidthEnabled, setMaxNoteWidthEnabled] = useLocalStorage<T_MaxNoteWidthEnabled>(
		'maxNoteWidthEnabled',
		false,
		{
			initializeWithValue: false,
			deserializer: (value: string) => value === 'true',
			serializer: (value: T_MaxNoteWidthEnabled) => value.toString(),
		},
	);
	const [firstCalendarDay, setFirstCalendarDay] = useLocalStorage<Date>('firstCalendarDay', new Date(), {
		initializeWithValue: false,
		deserializer: (value: string) => new Date(value),
		serializer: (value: Date) => value.toString(),
	});
	const [sidebarElements, setSidebarElements] = useLocalStorage<T_SidebarElements>(
		'sidebarElements',
		{
			courseRelated: true,
			notesList: true,
			usefulLinks: true,
			tasks: true,
			noteRelated: true,
			dangerZone: true,
			settings: true,
		},
		{
			initializeWithValue: false,
			deserializer: (value: string) => JSON.parse(value),
			serializer: (value: T_SidebarElements) => JSON.stringify(value),
		},
	);

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
		tasksOrder,
		setTasksOrder,
		displayedDays,
		setDisplayedDays,
		defaultNoteDuration,
		setDefaultNoteDuration,
		language,
		setLanguage,
		sidebarElements,
		setSidebarElements,
		noteAutoSave,
		setNoteAutoSave,
		maxNoteWidthEnabled,
		setMaxNoteWidthEnabled,
	};
};
