'use client';

import getNotes from '@/app/notes/_actions/get-notes';
import LoadingSpinner from '@/components/loading-spinner';
import { Course as T_Course } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';

type Props = {
	course: T_Course;
};

/**
 * A grid tile with loading spinner.
 */
export const CourseFallback = () => {
	return (
		<div className='pointer-events-none grid place-content-center rounded-xl bg-neutral-50 p-4 dark:bg-neutral-700 dark:text-white'>
			<LoadingSpinner />
		</div>
	);
};

/**
 * A link navigating to the latest note from it's course. If there are not notes it will automatically create one before rendering.
 */
const Course = ({ course }: Props) => {
	const [isPending, startTransition] = useTransition();
	// const { notes, createNote } = useAppContext();
	const { data: notes } = useQuery({
		queryKey: ['notes'],
		queryFn: getNotes,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	const thisCourseNotes = notes?.filter(note => note.courseId === course.id) || [];
	// const hasCreatedNote = useRef(false);

	// Create a first note if it doesn't exist
	// useEffect(() => {
	// 	if (thisCourseNotes.length === 0 && !hasCreatedNote.current) {
	// 		hasCreatedNote.current = true;
	// 		startTransition(async () => {
	// 			await createNote({ courseId: course.id });
	// 		});
	// 	}
	// }, [course.id, thisCourseNotes.length, createNote]);

	if (isPending) return <CourseFallback />;

	return (
		<Link
			href={`/notes/${thisCourseNotes[0]?.id}`}
			className='flex cursor-pointer items-center justify-between rounded-xl bg-neutral-50 p-4 text-white transition hover:opacity-90'
			style={{ background: course.color }}>
			<div>
				<p className='line-clamp-1 rounded-xl text-xl font-medium'>{course.name}</p>
				<p className='mt-1 line-clamp-1 opacity-75'>{course.teacher}</p>
			</div>
			<ChevronRight className='h-10 w-10 shrink-0' />
		</Link>
	);
};

export default Course;
