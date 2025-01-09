'use client';

import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { useToast } from '@/components/toast/use-toast';
import { useCourses } from '@/hooks/use-courses';
import { cn } from '@/utils/cn';
import { Course, Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateNote from '../_actions/update-note';

type Props = {
	currentCourse: Course;
	note: Note;
	forPage?: 'tasks' | 'notes';
};

/**
 * A dropdown menu used to choose a new course for the note.
 */
const ChangeCourse = ({ currentCourse, note, forPage = 'tasks' }: Props) => {
	const queryClient = useQueryClient();
	const { data: courses } = useCourses();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: updateNote,
		onMutate: () => {
			// TODO: optimistic update
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	const handleSelect = (newCourseId: string) => {
		mutate({ id: note.id, courseId: newCourseId });
	};

	return (
		<article>
			<p className='text-xl font-semibold'>Note&apos;s course</p>
			<DropdownMenu
				className={cn('mt-2 w-56', forPage === 'notes' && '', isPending && 'pointer-events-none opacity-50')}>
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
		</article>
	);
};

export default ChangeCourse;
