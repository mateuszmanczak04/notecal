import NewNoteButton from '@/app/notes/_components/new-note-button';
import { cn } from '@/lib/utils';
import { Course, Note } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';

type Props = {
	course: Course;
	notes: Note[];
	currentNodeId: string;
};

const SideNotes = ({ course, notes, currentNodeId }: Props) => {
	return (
		<div>
			<p className='text-xl font-semibold'>Notes:</p>

			<div className='mt-2 grid'>
				{/* List of all notes from this course */}
				{notes?.map((note, index) => (
					<Link
						prefetch
						key={note.id}
						href={`/notes/${note.id}`}
						aria-label={`link to note with date ${format(note.startTime, 'yyyy-MM-dd')}`}
						title={`link to note with date ${format(note.startTime, 'yyyy-MM-dd')}`}
						className={cn(
							'flex h-9 items-center justify-center gap-2 border-b border-l border-r px-3 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700',
							index === 0 && 'rounded-t-xl border-t',
							index === notes.length - 1 && 'border-b-transparent',
							note.id === currentNodeId && 'bg-neutral-200 dark:bg-neutral-600',
						)}>
						<span className='shrink-0 text-sm'>{format(note.startTime, 'yyyy-MM-dd')}</span>
					</Link>
				))}
			</div>

			<NewNoteButton color={course.color} courseId={course.id} />
		</div>
	);
};

export default SideNotes;
