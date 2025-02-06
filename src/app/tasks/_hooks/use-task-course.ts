import { useToast } from '@/components/toast/use-toast';
import { useCourses } from '@/hooks/use-courses';
import { Task as T_Task } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateTask from '../_actions/update-task';

export const useTaskCourse = (task: T_Task) => {
	const queryClient = useQueryClient();
	const { data: courses } = useCourses();
	const { toast } = useToast();
	const { mutate, isPending: isTaskCourseChangePending } = useMutation({
		mutationFn: updateTask,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});
	const currentTaskCourse = courses?.find(course => course.id === task.courseId);

	const handleSelectTaskCourse = (newCourseId: string | null) => {
		if (task.courseId && newCourseId === task.courseId) return;
		mutate({ id: task.id, courseId: newCourseId });
	};

	return {
		courses,
		isTaskCourseChangePending,
		currentTaskCourse,
		handleSelectTaskCourse,
	};
};
