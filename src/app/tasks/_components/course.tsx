'use client';

import updateTask from '@/app/tasks/_actions/update-task';
import useCourse from '@/app/courses/_hooks/use-course';
import useCourses from '@/app/courses/_hooks/use-courses';
import { updateTaskCourseId as updateTaskCourseIdLocal } from '@/lib/update-task';
import { OTHER_COURSE_NAME } from '@/lib/utils';
import { FC, useTransition } from 'react';
import Tag from './tag';
import { Skeleton } from '@/components/ui/skeleton';

interface TaskCourseProps {
	id: string;
	courseId: string | null;
}

const Course: FC<TaskCourseProps> = ({ id, courseId }) => {
	// here we store string as the course id
	// or null when user selected "Other" option
	const course = useCourse(courseId);

	// const [isPending, startTransition] = useTransition();
	// const onChange = (newCourseId: string) => {
	// 	startTransition(() => {
	// 		updateTask({
	// 			id,
	// 			courseId: newCourseId === OTHER_COURSE_NAME ? null : newCourseId,
	// 		});
	// 		updateTaskCourseIdLocal(id, newCourseId);
	// 	});
	// };

	return <Tag text={course?.name || 'No course'} />;
};

export default Course;
