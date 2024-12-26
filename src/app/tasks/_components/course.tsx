'use client';

import { useAppContext } from '@/app/_components/app-context';
import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useTransition } from 'react';

type Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
};

const Course = ({ task, forPage = 'tasks' }: Props) => {
	const [isPending, startTransition] = useTransition();
	const { courses, updateTask } = useAppContext();
	const currentCourse = courses.find(course => course.id === task.courseId);

	const handleSelect = (newCourseId: string | null) => {
		if (task.courseId && newCourseId === task.courseId) return;
		startTransition(async () => {
			await updateTask({ id: task.id, courseId: newCourseId });
		});
	};

	return (
		<DropdownMenu className={cn('w-52', forPage === 'notes' && 'w-full', isPending && 'opacity-50')}>
			<DropdownMenuTrigger showChevron>
				{currentCourse && (
					<div
						className='h-3 w-3 shrink-0 rounded-full'
						style={{ backgroundColor: currentCourse.color }}></div>
				)}
				<p className={cn('truncate', forPage === 'notes' && 'text-sm')}>{currentCourse?.name || 'None'}</p>
			</DropdownMenuTrigger>
			<DropdownMenuList>
				{/* Null option */}
				<DropdownMenuItem
					onSelect={handleSelect}
					key={'none' + Math.random()}
					value={null}
					className={cn(forPage === 'notes' && 'text-sm')}>
					None
				</DropdownMenuItem>
				{/* Options */}
				{courses &&
					courses.map(course => (
						<DropdownMenuItem onSelect={handleSelect} key={course.id} value={course.id}>
							<div
								className='h-3 w-3 shrink-0 rounded-full'
								style={{ backgroundColor: course.color }}></div>
							<p className={cn('truncate', forPage === 'notes' && 'text-sm')}>{course.name}</p>
						</DropdownMenuItem>
					))}
			</DropdownMenuList>
		</DropdownMenu>
	);
};

export default Course;
