import { Course } from '@prisma/client';
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
};

const LocalCourses = {
	append,
	update,
	remove,
};

export default LocalCourses;
