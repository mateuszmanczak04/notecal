'use client';

import { useAppContext } from '@/app/_components/app-context';
import createNote from '@/app/notes/_actions/create-note';
import LoadingSpinner from '@/components/loading-spinner';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useTransition } from 'react';

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
	const { notes: allNotes } = useAppContext();
	const notes = allNotes.filter(note => note.courseId === id);

	const [isPending, startTransition] = useTransition();

	useEffect(() => {
		if (notes.length === 0) {
			// Create a first note if it doesn't exist
			startTransition(async () => {
				const res = await createNote({ courseId: id });
				// TODO: handle error
				if ('note' in res) notes.push(res.note);
			});
		}
	}, [id, notes]);

	return (
		<Link
			href={`/notes/${notes[0].id}`}
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
