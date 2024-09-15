'use client';

import NewNoteButton from '@/app/notes/_components/new-note-button';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useNoteContext } from '../_context/note-context';

const SideNotes = () => {
	const params = useParams();
	const { course, notes } = useNoteContext();

	return (
		<div>
			<p className='text-xl font-semibold'>Notes:</p>
			<div className='grid'>
				{notes?.map((note, index) => (
					<Link
						prefetch
						key={note.id}
						href={`/notes/${course?.id}/${note.id}`}
						aria-label={`link to note with date ${format(note.startTime, 'yyyy-MM-dd')}`}
						title={`link to note with date ${format(note.startTime, 'yyyy-MM-dd')}`}
						className={cn(
							'flex h-9 items-center gap-2 border-b border-l border-r px-3 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700',
							index === 0 && 'rounded-t-xl border-t',
							index === notes.length - 1 &&
								'border-b-transparent',
							note.id === params.id &&
								'bg-neutral-200 dark:bg-neutral-600',
						)}>
						<span className='shrink-0 text-sm'>
							{format(note.startTime, 'yyyy-MM-dd')}
						</span>
						<span className='line-clamp-1 text-sm text-neutral-600 dark:text-neutral-300'>
							{note.content}
						</span>
					</Link>
				))}
			</div>
			<NewNoteButton />
		</div>
	);
};

export default SideNotes;
