import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCourses } from '../../../hooks/use-courses';
import { T_Task } from '../../../types';
import { useToast } from '../../toast/use-toast';

export const useTaskCourse = (task: T_Task) => {
	const queryClient = useQueryClient();
	const { data: courses } = useCourses();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { courseId: string | null }) =>
			await fetch(`/api/tasks/${task.id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			}).then(res => res.json()),
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});
	const currentTaskCourse = courses?.find(course => course.id === task.courseId);

	const updateTaskCourse = (newCourseId: string | null) => {
		if (task.courseId && newCourseId === task.courseId) return;
		mutate({ courseId: newCourseId });
	};

	return {
		courses,
		isPending,
		currentTaskCourse,
		updateTaskCourse,
	};
};
