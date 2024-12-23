'use client';

import { useAppContext } from '@/app/_components/app-context';
import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { cn } from '@/utils/cn';
import { Course, Note } from '@prisma/client';
import { useTransition } from 'react';
import updateNote from '../_actions/update-note';

type Props = {
	currentCourse: Course;
	note: Note;
};

const ChangeCourse = ({ currentCourse, note }: Props) => {
	const { courses } = useAppContext();
	const [isPending, startTransition] = useTransition();

	const handleSelect = (newCourseId: string) => {
		startTransition(async () => {
			updateNote({ id: note.id, courseId: newCourseId });
		});
	};

	return (
		<article>
			<p className='text-xl font-semibold'>Course:</p>
			<DropdownMenu className={cn('mt-2', isPending && 'opacity-50')}>
				<DropdownMenuTrigger showChevron>
					<p className='truncate'>{currentCourse.name}</p>
				</DropdownMenuTrigger>
				<DropdownMenuList>
					{courses.map(course => (
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
