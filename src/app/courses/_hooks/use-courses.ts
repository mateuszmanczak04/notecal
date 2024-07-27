import getCourses from '@/app/courses/_actions/get-courses';
import queryClient from '@/lib/query-client';
import { Course } from '@prisma/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import createCourse from '../_actions/create-course';
import updateCourse from '../_actions/update-course';
import deleteCourse from '../_actions/delete-course';
import useNotes from '@/app/notes/_hooks/use-notes';

type CourseWithLoading = Course & { loading?: boolean };

type CreateCourseSchema = {
	name: string;
	teacher: string;
	color: string;
};

type UpdateCourseSchema = {
	id: string;
	name?: string;
	teacher?: string;
	color?: string;
};

// Returns a temporary note with fake fields:
// extended by "loading: true" field:
const createTempCourse = (values: CreateCourseSchema): CourseWithLoading => ({
	...values,
	id: crypto.randomUUID(),
	userId: '',
	loading: true,
});

const useCourses = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['courses'],
		queryFn: async () => {
			const { courses, error } = await getCourses();
			if (error) throw new Error(error);
			return courses;
		},
	});

	// Inserting
	const { mutate: add } = useMutation({
		mutationFn: async (values: CreateCourseSchema) => {
			const { newCourse, error } = await createCourse(values);
			if (error) throw new Error(error);
			return newCourse;
		},
		onMutate: async (values: CreateCourseSchema) => {
			await queryClient.cancelQueries({ queryKey: ['courses'] });
			const previousCourses = queryClient.getQueryData(['courses']);

			const newTempCourse = createTempCourse(values);

			await queryClient.setQueryData(['courses'], (oldCourses: Course[]) => [
				...oldCourses,
				newTempCourse,
			]);

			return previousCourses;
		},
		onError: (_err, _variables, context) => {
			// Rollback previous state
			queryClient.setQueryData(['courses'], context);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ['courses'] });
		},
	});

	// Updating
	const { mutate: update } = useMutation({
		mutationFn: async (values: UpdateCourseSchema) => {
			const { updatedCourse, error } = await updateCourse(values);
			if (error) throw new Error(error);
			return updatedCourse;
		},
		onMutate: async (values: UpdateCourseSchema) => {
			await queryClient.cancelQueries({ queryKey: ['courses'] });
			const previousCourses = queryClient.getQueryData(['courses']);

			await queryClient.setQueryData(['courses'], (oldCourses: Course[]) => {
				return oldCourses.map(course => {
					if (course.id === values.id) {
						return { ...course, ...values };
					}
					return course;
				});
			});

			return previousCourses;
		},
		onError: (_err, _variables, context) => {
			// Rollback previous state
			queryClient.setQueryData(['courses'], context);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ['courses'] });
		},
	});

	// Deleting
	// TODO: delete all related notes
	const { mutate: remove } = useMutation({
		mutationFn: async (id: string) => {
			const { error } = await deleteCourse({ id });
			if (error) throw new Error(error);
			return id;
		},
		onMutate: async (id: string) => {
			await queryClient.cancelQueries({ queryKey: ['courses'] });
			const previousCourses = queryClient.getQueryData(['courses']);

			await queryClient.setQueryData(['courses'], (oldCourses: Course[]) => {
				return oldCourses.filter(course => {
					if (course.id === id) {
						return null;
					}
					return course;
				});
			});

			return previousCourses;
		},
		onError: (_err, _variables, context) => {
			// Rollback previous state
			queryClient.setQueryData(['courses'], context);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ['courses'] });
		},
	});

	return { courses: data, isPending, error, add, update, remove };
};

export default useCourses;
