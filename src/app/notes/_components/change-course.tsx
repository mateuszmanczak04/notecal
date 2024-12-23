'use client';

import { useAppContext } from '@/app/_components/app-context';
import { DropdownMenu, DropdownMenuItem, DropdownMenuList, DropdownMenuTrigger } from '@/components/dropdown-menu';
import { Course, Note } from '@prisma/client';

type Props = {
	currentCourse: Course;
	note: Note;
};

const ChangeCourse = ({ currentCourse, note }: Props) => {
	const { courses } = useAppContext();

	const update = (value: any) => {};

	const handleSelect = (newCourseId: string) => {
		update({ courseId: newCourseId, id: note.id });
	};

	return (
		<div>
			<p className='text-xl font-semibold'>Course:</p>
			<DropdownMenu className='mt-2'>
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
		</div>
	);
};

export default ChangeCourse;
