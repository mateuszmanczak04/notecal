import { Course, Task } from '@prisma/client';
import LocalTasks from './local-tasks';
import queryClient from './query-client';

const append = async (course: Course) => {
	await queryClient.setQueryData(['courses'], (prev: { courses: Course[] }) => {
		return {
			courses: [...prev.courses, course],
		};
	});
};

const update = async (id: string, properties: Object) => {
	await queryClient.setQueryData(['courses'], (prev: { courses: Course[] }) => {
		return {
			courses: prev.courses.map(course => {
				if (course.id === id) {
					return { ...course, ...properties };
				}
				return course;
			}),
		};
	});
};

const remove = async (id: string) => {
	await queryClient.setQueryData(['courses'], (prev: { courses: Course[] }) => {
		return {
			courses: prev.courses.filter(course => course.id !== id),
		};
	});

	// TODO: Remove all related notes (cascade):
	// const notes: Note[] | undefined = await queryClient.getQueryData(['notes']);
	// if (notes) {
	// 	for await (const note of notes) {
	// 		await LocalNotes.remove(note.id);
	// 	}
	// }

	// Remove all related tasks (cascade):
	const tasks: Task[] | undefined = await queryClient.getQueryData(['tasks']);
	if (tasks) {
		for await (const task of tasks) {
			await LocalTasks.remove(task.id);
		}
	}
};

const LocalCourses = {
	append,
	update,
	remove,
};

export default LocalCourses;
