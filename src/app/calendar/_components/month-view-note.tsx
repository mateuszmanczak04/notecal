'use client';

import { useCourses } from '@/hooks/use-courses';
import { Note } from '@prisma/client';
import Link from 'next/link';

type Props = {
	note: Note;
};

const MonthViewNote = ({ note }: Props) => {
	const { data: courses } = useCourses();
	const noteCourse = courses?.find(c => c.id === note.courseId);

	if (!noteCourse) return;

	return (
		<Link
			href={`/notes/${note.id}`}
			style={{ backgroundColor: noteCourse.color }}
			className='truncate text-nowrap rounded-md px-2 text-sm text-white'>
			{note.title || noteCourse.name}
		</Link>
	);
};

export default MonthViewNote;
