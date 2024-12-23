import createNote from '@/app/notes/_actions/create-note';
import ErrorMessage from '@/components/error-message';
import LoadingSpinner from '@/components/loading-spinner';
import db from '@/utils/db';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

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
const Course = async ({ name, teacher, id, color }: Props) => {
	let notes = await db.note.findMany({
		where: {
			courseId: id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	// Create a first note if it doesn't exist
	if (notes.length === 0) {
		const res = await createNote({ courseId: id });

		if ('error' in res) {
			return <ErrorMessage>{res.error}</ErrorMessage>;
		}

		notes.push(res.note);
	}

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
