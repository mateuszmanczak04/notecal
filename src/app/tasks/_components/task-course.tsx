'use client';

import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useTaskCourse } from '../_hooks/use-task-course';

type T_Props = {
	task: Task;
};

const TaskCourse = ({ task }: T_Props) => {
	const { currentTaskCourse, handleSelectTaskCourse, isTaskCourseChangePending, courses } = useTaskCourse(task);

	return (
		<DropdownMenu className={cn('w-52', isTaskCourseChangePending && 'pointer-events-none opacity-50')}>
			<DropdownMenuTrigger showChevron>
				{currentTaskCourse && (
					<div
						className='h-3 w-3 shrink-0 rounded-full'
						style={{ backgroundColor: currentTaskCourse.color }}></div>
				)}
				<p className='truncate'>{currentTaskCourse?.name || 'None'}</p>
			</DropdownMenuTrigger>
			<DropdownMenuList>
				{/* Null option */}
				<DropdownMenuItem onSelect={handleSelectTaskCourse} key={'none' + Math.random()} value={null}>
					None
				</DropdownMenuItem>
				{/* Options */}
				{courses &&
					courses.map(course => (
						<DropdownMenuItem onSelect={handleSelectTaskCourse} key={course.id} value={course.id}>
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

export default TaskCourse;
