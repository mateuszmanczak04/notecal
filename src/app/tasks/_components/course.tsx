'use client';

import getCourses from '@/app/courses/_actions/get-courses';
import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { cn } from '@/utils/cn';
import { Task } from '@prisma/client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import updateTask from '../_actions/update-task';

type Props = {
	task: Task;
	forPage?: 'tasks' | 'notes';
};

const Course = ({ task, forPage = 'tasks' }: Props) => {
	const queryClient = useQueryClient();
	const { data: courses } = useQuery({
		queryKey: ['courses'],
		queryFn: getCourses,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	const { mutate, isPending } = useMutation({
		mutationFn: updateTask,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['tasks'] });
		},
	});
	const currentCourse = courses?.find(course => course.id === task.courseId);

	const handleSelect = (newCourseId: string | null) => {
		if (task.courseId && newCourseId === task.courseId) return;
		mutate({ id: task.id, courseId: newCourseId });
	};

	return (
		<DropdownMenu
			className={cn('w-52', forPage === 'notes' && 'w-full', isPending && 'pointer-events-none opacity-50')}>
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
