'use client';

import { useAppContext } from '@/app/_components/app-context';
import LoadingSpinner from '@/components/loading-spinner';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useTransition } from 'react';

type Props = {
	name: string;
	id: string;
	teacher: string;
	color: string;
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
const Course = ({ name, teacher, id, color }: Props) => {
	const [isPending, startTransition] = useTransition();
	const { notes, createNote } = useAppContext();
	const thisCourseNotes = notes.filter(note => note.courseId === id);
	const hasCreatedNote = useRef(false);

	// Create a first note if it doesn't exist
	useEffect(() => {
		if (thisCourseNotes.length === 0 && !hasCreatedNote.current) {
			hasCreatedNote.current = true;
			startTransition(async () => {
				await createNote({ courseId: id });
			});
		}
	}, [id, thisCourseNotes.length, createNote]);

	if (isPending) return <CourseFallback />;

	return (
		<Link
			href={`/notes/${thisCourseNotes[0]?.id}`}
			className='flex cursor-pointer items-center justify-between rounded-xl bg-neutral-50 p-4 text-white transition hover:opacity-90'
			style={{ background: color }}>
			<div>
				<p className='line-clamp-1 rounded-xl text-xl font-medium'>{name}</p>
				<p className='mt-1 line-clamp-1 opacity-75'>{teacher}</p>
			</div>
			<ChevronRight className='h-10 w-10 shrink-0' />
		</Link>
	);
};

export default Course;
