/**
 * A set of database queries which are memoized at the request (wrapped with React.cache).
 */
import { cache } from 'react';
import { getAuthStatus } from './auth';
import db from './db';

export const getUser = cache(async () => {
	const { authenticated, user: authUser } = await getAuthStatus();

	if (!authenticated) return null;

	const user = await db.user.findUnique({ where: { id: authUser.id } });

	return user;
});

export const getTasks = cache(async () => {
	const user = await getUser();

	if (!user) return [];

	const tasks = await db.task.findMany({
		where: { userId: user.id },
		orderBy: {
			[user.orderTasks]: 'asc',
		},
	});

	return tasks;
});

export const getTaskById = cache(async (id: string) => {
	const tasks = await getTasks();
	return tasks.find(task => task.id === id);
});

export const getTasksByCourseId = cache(async (id: string) => {
	const tasks = await getTasks();
	return tasks.filter(task => task.courseId === id);
});

export const getNotes = cache(async () => {
	const user = await getUser();

	if (!user) return [];

	const notes = await db.note.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return notes;
});

export const getNoteById = cache(async (id: string) => {
	const notes = await getNotes();
	return notes.find(note => note.id === id);
});

export const getNotesByCourseId = cache(async (id: string) => {
	const notes = await getNotes();
	return notes.filter(note => note.courseId === id);
});

export const getCourses = cache(async () => {
	const user = await getUser();

	if (!user) return [];

	const courses = await db.course.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			name: 'asc',
		},
	});

	return courses;
});

export const getCourseById = cache(async (id: string) => {
	const courses = await getCourses();
	return courses.find(course => course.id === id);
});
