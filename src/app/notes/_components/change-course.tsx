'use client';

import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuList,
	DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { Course, Note } from '@prisma/client';
import useNotes from '../_hooks/use-notes';

type Props = {
	courses: Course[];
	currentCourse: Course;
	note: Note;
};

const ChangeCourse = ({ courses, currentCourse, note }: Props) => {
	const { update } = useNotes();

	const handleSelect = (id: string) => {
		update({ courseId: id, id: note.id });
	};

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger showChevron>
					<p className='truncate'>{currentCourse.name}</p>
				</DropdownMenuTrigger>
				<DropdownMenuList>
					{courses.map(course => (
						<DropdownMenuItem
							key={course.id}
							value={course.id}
							onSelect={() => handleSelect(course.id)}>
							{course.name}
						</DropdownMenuItem>
					))}
				</DropdownMenuList>
			</DropdownMenu>
		</div>
	);
};

export default ChangeCourse;
