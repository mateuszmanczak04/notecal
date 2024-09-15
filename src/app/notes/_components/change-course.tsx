'use client';

import {
	DropdownMenu,
	DropdownMenuItem,
	DropdownMenuList,
	DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { Course, Note } from '@prisma/client';
import { ChevronDown } from 'lucide-react';
import useNotes from '../_hooks/use-notes';

type Props = {
	courses: Course[];
	note: Note;
};

const ChangeCourse = ({ courses, note }: Props) => {
	const { update } = useNotes();

	const handleSelect = (id: string) => {
		update({ courseId: id, id: note.id });
	};

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger>
					Trigger <ChevronDown className='h-5 w-5' />
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
