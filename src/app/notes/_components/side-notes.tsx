'use client';

import { Button } from '@/components/button';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Course, Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import createNote from '../_actions/create-note';

type Props = {
	currentCourse: Course;
	currentNoteId: string;
	currentCourseNotes: Note[];
};

const SideNotes = ({ currentCourse, currentNoteId, currentCourseNotes }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: createNote,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	const handleNewNote = () => {
		mutate({ courseId: currentCourse.id });
	};

	return (
		<article>
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
				onClick={handleNewNote}
				className={cn('w-full rounded-t-none', isPending && 'pointer-events-none opacity-50')}
				disabled={isPending}>
				<Plus className='h-4 w-4' /> Create a new note
			</Button>
		</article>
	);
};

export default SideNotes;
