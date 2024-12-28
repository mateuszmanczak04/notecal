'use client';

import { useCourses } from '@/app/_hooks/use-courses';
import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Course, Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import updateNote from '../_actions/update-note';

type Props = {
	currentCourse: Course;
	note: Note;
};

/**
 * A dropdown menu used to choose a new course for the note.
 */
const ChangeCourse = ({ currentCourse, note }: Props) => {
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
			<DropdownMenu className={cn('mt-2', isPending && 'pointer-events-none opacity-50')}>
				<DropdownMenuTrigger showChevron>
					<p className='truncate'>{currentCourse.name}</p>
				</DropdownMenuTrigger>
				<DropdownMenuList>
					{courses?.map(course => (
						<DropdownMenuItem key={course.id} value={course.id} onSelect={handleSelect}>
							{course.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuList>
			</DropdownMenu>
		</article>
	);
};

export default ChangeCourse;
