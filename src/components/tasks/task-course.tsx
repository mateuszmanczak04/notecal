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
import { OTHER_COURSE_NAME } from '@/lib/utils';
import { Course } from '@prisma/client';
import { FC, useState, useTransition } from 'react';

interface TaskCourseProps {
	courseName: string;
	id: string;
	courseId: string;
	courses: Course[];
}

const TaskCourse: FC<TaskCourseProps> = ({
	id,
	courseName: initialCourseName,
	courseId: initialCourseId,
	courses,
}) => {
	const [courseId, setCourseId] = useState<string>(initialCourseId || 'other');
	const [courseName, setCourseName] = useState<string>(
		initialCourseName || 'Other',
	);
	const [isPending, startTransition] = useTransition();

	// todo - add error handling and use of useOptimistic
	const onChange = (newCourseId: any) => {
		startTransition(() => {
			updateTaskCourseId({ id, newCourseId });
			if (newCourseId === OTHER_COURSE_NAME) {
				setCourseId('other');
				setCourseName('Other');
			} else {
				setCourseId(newCourseId);
				setCourseName(courses.filter(c => c.id === newCourseId)[0].name);
			}
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='-mt-1 h-6 pt-0'>
				<Badge className='pointer-events-none bg-purple-600 shadow-none'>
					{courseName}
				</Badge>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Choose the course</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuRadioGroup value={courseId} onValueChange={onChange}>
					{courses &&
						courses.length > 0 &&
						courses.map(course => (
							<DropdownMenuRadioItem
								className='cursor-pointer'
								key={course.id}
								value={course.id}>
								{course.name}
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
