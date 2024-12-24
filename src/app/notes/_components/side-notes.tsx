'use client';

import { useAppContext } from '@/app/_components/app-context';
import { Button } from '@/components/button';
import LoadingSpinner from '@/components/loading-spinner';
import { cn } from '@/utils/cn';
import { Course, Note } from '@prisma/client';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useTransition } from 'react';

type Props = {
	currentCourse: Course;
	currentNoteId: string;
	currentCourseNotes: Note[];
};

const SideNotes = ({ currentCourse, currentNoteId, currentCourseNotes }: Props) => {
	const { createNote } = useAppContext();
	const [isPending, startTransition] = useTransition();

	const onClick = () => {
		startTransition(async () => {
			await createNote({ courseId: currentCourse.id });
		});
	};

	return (
		<div>
			<p className='text-xl font-semibold'>Notes:</p>

			<div className='mt-2 grid'>
				{/* List of all notes from this course */}
				{currentCourseNotes?.map((note, index) => (
					<Link
						prefetch
						key={note.id}
						href={`/notes/${note.id}`}
						aria-label={`link to note with date ${format(note.startTime, 'yyyy-MM-dd')}`}
						title={`link to note with date ${format(note.startTime, 'yyyy-MM-dd')}`}
						className={cn(
							'flex h-9 items-center justify-center gap-2 border-b border-l border-r px-3 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700',
							index === 0 && 'rounded-t-xl border-t',
							index === currentCourseNotes.length - 1 && 'border-b-transparent',
							note.id === currentNoteId && 'bg-neutral-200 dark:bg-neutral-600',
						)}>
						<span className='shrink-0 text-sm'>{format(note.startTime, 'yyyy-MM-dd')}</span>
					</Link>
				))}
			</div>

			{/* New note button */}
			<Button
				style={{ backgroundColor: currentCourse.color }}
				onClick={onClick}
				className='w-full rounded-t-none'>
				{isPending && <LoadingSpinner />}
				<Plus className='h-4 w-4' /> Create a new note
			</Button>
		</div>
	);
};

export default SideNotes;
