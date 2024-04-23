'use client';

import { updateTaskCourseId } from '@/actions/update-task-course-id';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import useCourse from '@/hooks/use-course';
import useCourses from '@/hooks/use-courses';
import { OTHER_COURSE_NAME, cn } from '@/lib/utils';
import { Course } from '@prisma/client';
import { FC, useState, useTransition } from 'react';

interface TaskCourseProps {
	id: string;
	courseId: string | null;
}

const TaskCourse: FC<TaskCourseProps> = ({ id, courseId: initialCourseId }) => {
	// here we store string as the course id
	// or null when user selected "Other" option
	const [courseId, setCourseId] = useState<string | null>(
		initialCourseId || null,
	);
	const [isPending, startTransition] = useTransition();

	const { data } = useCourses();
	const courses = data?.courses;
	const course = useCourse(courseId);

	// todo - add error handling and use of useOptimistic
	const onChange = (newCourseId: string) => {
		startTransition(() => {
			updateTaskCourseId({ id, newCourseId });
			if (newCourseId === OTHER_COURSE_NAME) {
				// when choosed 'Other'
				setCourseId(null);
			} else if (courses && courses.length > 0) {
				// when choosed a course
				setCourseId(newCourseId);
			}
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='-mt-1 h-6 select-none pt-0 outline-none'>
				<Badge
					className={cn(
						'pointer-events-none bg-purple-600 shadow-none',
						isPending && 'opacity-75',
					)}>
					{course?.name || 'Other'}
				</Badge>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Choose the course</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup
					value={courseId || OTHER_COURSE_NAME}
					onValueChange={onChange}>
					{courses &&
						courses.length > 0 &&
						courses.map(c => (
							<DropdownMenuRadioItem
								className='cursor-pointer'
								key={c.id}
								value={c.id}>
								{c.name}
							</DropdownMenuRadioItem>
						))}
					<DropdownMenuRadioItem
						className='cursor-pointer'
						key={OTHER_COURSE_NAME}
						value={OTHER_COURSE_NAME}>
						Other
					</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default TaskCourse;
