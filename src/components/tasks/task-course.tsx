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
import { updateTaskCourseId as updateTaskCourseIdLocal } from '@/lib/update-task';
import { OTHER_COURSE_NAME, cn } from '@/lib/utils';
import { FC, useTransition } from 'react';

interface TaskCourseProps {
	id: string;
	courseId: string | null;
}

const TaskCourse: FC<TaskCourseProps> = ({ id, courseId }) => {
	// here we store string as the course id
	// or null when user selected "Other" option
	const [isPending, startTransition] = useTransition();

	const { data } = useCourses();
	const courses = data?.courses;
	const course = useCourse(courseId);

	// todo - add error handling and use of useOptimistic
	const onChange = (newCourseId: string) => {
		startTransition(() => {
			updateTaskCourseId({ id, newCourseId });
			updateTaskCourseIdLocal(id, newCourseId);
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='-mt-1 h-6 select-none pt-0 outline-none'>
				<Badge className='pointer-events-none bg-purple-600 shadow-none'>
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
