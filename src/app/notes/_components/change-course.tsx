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
	forPage?: 'context-menu' | 'notes';
	handleClose?: () => void;
};

/**
 * A dropdown menu used to choose a new course for the note.
 */
const ChangeCourse = ({ currentCourse, note, forPage = 'notes', handleClose }: Props) => {
	const queryClient = useQueryClient();
	const { data: courses } = useCourses();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: updateNote,
		onMutate: data => {
			// Optimistic update
			queryClient.setQueryData(['notes'], (prev: Note[]) => {
				return prev.map(n => {
					if (n.id === data.id) {
						return { ...n, courseId: data.courseId };
					}
					return n;
				});
			});
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

	if (forPage === 'context-menu') {
		return (
			<div className='flex flex-col justify-center overflow-clip rounded-xl border bg-white text-neutral-800 dark:border-neutral-500 dark:bg-neutral-600 dark:text-white'>
				{/* Options */}
				{courses &&
					courses.map(course => (
						<button
							onClick={() => {
								handleSelect(course.id);
								handleClose && handleClose();
							}}
							key={course.id}
							value={course.id}
							className='flex h-9 cursor-pointer select-none items-center gap-2 truncate text-nowrap px-4 font-medium transition hover:bg-neutral-100 dark:hover:bg-neutral-500'>
							<div
								className='h-3 w-3 shrink-0 rounded-full'
								style={{ backgroundColor: course.color }}></div>
							<p className={'truncate text-sm'}>{course.name}</p>
						</button>
					))}
			</div>
		);
	}

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
