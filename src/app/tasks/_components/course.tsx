'use client';

import { Task } from '@prisma/client';
import { ClassNameValue } from 'tailwind-merge';

type Props = {
	className?: ClassNameValue;
	task: Task;
};

const Course = ({ className, task }: Props) => {
	// const { courses } = useCourses();
	// const currentCourse = useCourse(task.courseId);
	// const { makeUpdate } = useTasksHistory(); // Cmd + Z
	// const { update } = useTasks();
	// const handleSelect = (newCourseId: string | null) => {
	// 	if (task.courseId && newCourseId === task.courseId) return;
	// 	update({ id: task.id, courseId: newCourseId });
	// 	makeUpdate({
	// 		type: 'update',
	// 		property: 'courseId',
	// 		id: task.id,
	// 		oldValue: task.courseId,
	// 		newValue: newCourseId,
	// 	});
	// };
	// return (
	// 	<DropdownMenu className={cn('w-52', className)}>
	// 		<DropdownMenuTrigger showChevron>
	// 			{currentCourse && (
	// 				<div
	// 					className='h-3 w-3 shrink-0 rounded-full'
	// 					style={{ backgroundColor: currentCourse.color }}
	// 				></div>
	// 			)}
	// 			<p className='truncate'>{currentCourse?.name || 'None'}</p>
	// 		</DropdownMenuTrigger>
	// 		<DropdownMenuList>
	// 			{/* Null option */}
	// 			<DropdownMenuItem onSelect={handleSelect} key={'none' + Math.random()} value={null}>
	// 				None
	// 			</DropdownMenuItem>
	// 			{/* Options */}
	// 			{courses &&
	// 				courses.map(course => (
	// 					<DropdownMenuItem onSelect={handleSelect} key={course.id} value={course.id}>
	// 						<div
	// 							className='h-3 w-3 shrink-0 rounded-full'
	// 							style={{ backgroundColor: course.color }}
	// 						></div>
	// 						<p className='truncate'>{course.name}</p>
	// 					</DropdownMenuItem>
	// 				))}
	// 		</DropdownMenuList>
	// 	</DropdownMenu>
	// );
};

export default Course;
