'use client';

import useCourses from '@/hooks/use-courses';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { FC } from 'react';

interface CalendarNoteBlockProps {
	id: string;
	newNoteTempId: string | null;
	startTime: Date;
	endTime: Date;
	courseId: string;
}

const CalendarNoteBlock: FC<CalendarNoteBlockProps> = ({
	id,
	newNoteTempId,
	startTime,
	endTime,
	courseId,
}) => {
	const {
		courses,
		isPending: isCoursesPending,
		error: coursesError,
	} = useCourses();

	if (isCoursesPending || coursesError) return null;

	const hour = startTime.getHours();
	const minute = startTime.getMinutes();
	const topTranslate = Math.floor((hour + minute / 60) * 64);

	return (
		<Link
			href={id === newNoteTempId ? '/notes' : `/notes/${courseId}/${id}`}
			className={cn(
				'absolute left-2 right-0 top-0 min-h-4 cursor-pointer select-none overflow-y-hidden rounded-md border border-slate-200 bg-slate-100 p-2 text-sm transition dark:border-slate-500 dark:bg-slate-600 dark:text-white',
				id === newNoteTempId && 'pointer-events-none opacity-75',
			)}
			style={{
				transform: `translateY(${topTranslate}px)`,
				height:
					((endTime.getTime() - startTime.getTime()) / 3600_000) * 64 + 'px',
			}}
			key={id}>
			{courses && courses.find(c => c.id === courseId)?.name}
		</Link>
	);
};

export default CalendarNoteBlock;
