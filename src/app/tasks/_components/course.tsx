'use client';

import useCourse from '@/app/courses/_hooks/use-course';
import useCourses from '@/app/courses/_hooks/use-courses';
import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuList,
	DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { cn } from '@/lib/utils';
import { Task } from '@prisma/client';
import { ClassNameValue } from 'tailwind-merge';
import useTasks from '../_hooks/use-tasks';
import useTasksHistory from '../_hooks/use-tasks-history';

type Props = {
	className?: ClassNameValue;
	task: Task;
};

const Course = ({ className, task }: Props) => {
	const { courses } = useCourses();
	const currentCourse = useCourse(task.courseId);
	const { makeUpdate } = useTasksHistory(); // Cmd + Z
	const { update } = useTasks();

	const handleSelect = (newCourseId: string | null) => {
		if (task.courseId && newCourseId === task.courseId) return;

		update({ id: task.id, courseId: newCourseId });
		makeUpdate({
			type: 'update',
			property: 'courseId',
			id: task.id,
			oldValue: task.courseId,
			newValue: newCourseId,
		});
	};

	return (
		<DropdownMenu className={cn('w-52', className)}>
			<DropdownMenuTrigger showChevron>
				{currentCourse && (
					<div
						className='h-3 w-3 shrink-0 rounded-full'
						style={{ backgroundColor: currentCourse.color }}></div>
				)}
				<p className='truncate'>{currentCourse?.name || 'None'}</p>
			</DropdownMenuTrigger>
			<DropdownMenuList>
				{/* Null option */}
				<DropdownMenuItem
					onSelect={handleSelect}
					key={'none' + Math.random()}
					value={null}>
					None
				</DropdownMenuItem>

				{/* Options */}
				{courses &&
					courses.map(course => (
						<DropdownMenuItem
							onSelect={handleSelect}
							key={course.id}
							value={course.id}>
							<div
								className='h-3 w-3 shrink-0 rounded-full'
								style={{ backgroundColor: course.color }}></div>
							<p className='truncate'>{course.name}</p>
						</DropdownMenuItem>
					))}
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default Course;
