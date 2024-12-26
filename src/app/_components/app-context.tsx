'use client';

import { Course, Note, Task } from '@prisma/client';
import { createContext, ReactNode, useContext, useState } from 'react';
import createCourseServer, { T_CreateCourseInput } from '../courses/_actions/create-course';
import deleteCourseServer, { T_DeleteCourseInput } from '../courses/_actions/delete-course';
import getCourses from '../courses/_actions/get-courses';
import updateCourseServer, { T_UpdateCourseInput } from '../courses/_actions/update-course';
import createNoteServer, { T_CreateNoteInput } from '../notes/_actions/create-note';
import deleteNoteServer, { T_DeleteNoteInput } from '../notes/_actions/delete-note';
import getNotes from '../notes/_actions/get-notes';
import updateNoteServer, { T_UpdateNoteInput } from '../notes/_actions/update-note';
import getSettings from '../settings/_actions/get-settings';
import { T_UpdateSettingsInput } from '../settings/_actions/update-settings';
import createTaskServer, { T_CreateTaskInput } from '../tasks/_actions/create-task';
import deleteTaskServer, { T_DeleteTaskInput } from '../tasks/_actions/delete-task';
import getTasks from '../tasks/_actions/get-tasks';
import updateTaskServer, { T_UpdateTaskInput } from '../tasks/_actions/update-task';

type Settings = {
	displayedDays: number;
	zoomLevel: number;
	defaultNoteDuration: number;
	language: string;
	orderTasks: string;
};

type User = {
	id: string;
	emailVerified: boolean;
	email: string;
};

type AppContextProps = {
	tasks: Task[];
	courses: Course[];
	notes: Note[];
	settings: Settings;
	user: User;
	createNote: (values: T_CreateNoteInput) => Promise<void>;
	updateNote: (values: T_UpdateNoteInput) => Promise<void>;
	deleteNote: (values: T_DeleteNoteInput) => Promise<void>;
	createCourse: (values: T_CreateCourseInput) => Promise<void>;
	updateCourse: (values: T_UpdateCourseInput) => Promise<void>;
	deleteCourse: (values: T_DeleteCourseInput) => Promise<void>;
	createTask: (values: T_CreateTaskInput) => Promise<void>;
	updateTask: (values: T_UpdateTaskInput) => Promise<void>;
	deleteTask: (values: T_DeleteTaskInput) => Promise<void>;
	updateSettings: (values: T_UpdateSettingsInput) => Promise<void>;
};

const AppContext = createContext({} as AppContextProps);

/**
 * A hook used to get tasks, courses and notes. It is initiated from initial fetch in root layout.
 */
export const useAppContext = () => {
	const context = useContext(AppContext);
	if (!context) throw new Error('useAppContext must be wrapperd with AppContextProvider');
	return context;
};

type AppContextProviderProps = {
	initialTasks: Task[];
	initialCourses: Course[];
	initialNotes: Note[];
	initialSettings: Settings;
	initialUser: User;
	children: ReactNode;
};

const AppContextProvider = ({
	initialTasks,
	initialCourses,
	initialNotes,
	initialSettings,
	initialUser,
	children,
}: AppContextProviderProps) => {
	const [notes, setNotes] = useState<Note[]>(initialNotes);
	const [courses, setCourses] = useState<Course[]>(initialCourses);
	const [tasks, setTasks] = useState<Task[]>(initialTasks);
	const [settings, setSettings] = useState<Settings>(initialSettings);
	const [user, setUser] = useState<User>(initialUser);

	/** Fetches notes from backend and replaces current notes with fresh ones. */
	const refetchNotes = async () => {
		const freshNotes = await getNotes();
		setNotes(freshNotes);
	};

	/** Creates a new note in db and refetches notes to be fresh. */
	const createNote = async (values: T_CreateNoteInput) => {
		await createNoteServer(values);
		await refetchNotes();
	};

	/** Updates a note in db and refetches notes to be fresh. */
	const updateNote = async (values: T_UpdateNoteInput) => {
		await updateNoteServer(values);
		await refetchNotes();
	};

	/** Deletes a note in db and refetches notes to be fresh. */
	const deleteNote = async (values: T_DeleteNoteInput) => {
		await deleteNoteServer(values);
		await refetchNotes();
	};

	/** Fetches courses from backend and replaces current courses with fresh ones. */
	const refetchCourses = async () => {
		const freshCourses = await getCourses();
		setCourses(freshCourses);
	};

	/** Creates a new course in db and refetches courses to be fresh. */
	const createCourse = async (values: T_CreateCourseInput) => {
		await createCourseServer(values);
		await refetchCourses();
	};

	/** Updates a course in db and refetches courses to be fresh. */
	const updateCourse = async (values: T_UpdateCourseInput) => {
		await updateCourseServer(values);
		await refetchCourses();
	};

	/** Deletes a course in db and refetches courses to be fresh. */
	const deleteCourse = async (values: T_DeleteCourseInput) => {
		await deleteCourseServer(values);
		await refetchCourses();
	};

	/** Fetches courses from backend and replaces current courses with fresh ones. */
	const refetchTasks = async (orderBy?: string) => {
		const freshTasks = await getTasks({ orderBy });
		setTasks(freshTasks);
	};

	/** Creates a new Task in db and refetches Tasks to be fresh. */
	const createTask = async (values: T_CreateTaskInput) => {
		await createTaskServer(values);
		await refetchTasks();
	};

	/** Updates a Task in db and refetches Tasks to be fresh. */
	const updateTask = async (values: T_UpdateTaskInput) => {
		await updateTaskServer(values);
		await refetchTasks();
	};

	/** Deletes a Task in db and refetches Tasks to be fresh. */
	const deleteTask = async (values: T_DeleteTaskInput) => {
		await deleteTaskServer(values);
		await refetchTasks();
	};

	const refetchSettings = async () => {
		const freshSettings = await getSettings();
		if ('error' in freshSettings) return; // TODO: handle this error
		setSettings(freshSettings);
	};

	const updateSettings = async (values: T_UpdateSettingsInput) => {
		await updateSettings(values);
		await refetchSettings();
	};

	return (
		<AppContext
			value={{
				courses,
				createCourse,
				updateCourse,
				deleteCourse,
				notes,
				createNote,
				updateNote,
				deleteNote,
				tasks,
				createTask,
				updateTask,
				deleteTask,
				settings,
				updateSettings,
				user,
			}}>
			{children}
		</AppContext>
	);
};

export default AppContextProvider;
