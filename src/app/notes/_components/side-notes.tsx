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
		<article className='flex w-full flex-col'>
			<>
				{/* List of all notes from this course */}
				{currentCourseNotes?.map((note, index) => (
					<Link
						prefetch
						key={note.id}
						href={`/notes/${note.id}`}
						aria-label={`link to note ${note.title}`}
						title={`link to note ${note.title}`}
						className={cn(
							'flex h-9 items-center justify-center gap-2 overflow-x-clip border-b border-l border-r px-3 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-700',
							index === 0 && 'rounded-t-xl border-t',
							index === currentCourseNotes.length - 1 && 'border-b-transparent',
							note.id === currentNoteId && 'bg-neutral-100 dark:bg-neutral-600',
						)}>
						<span className=' w-full shrink-0 truncate text-center text-sm'>
							<span className='mr-2 font-semibold'>{format(note.startTime, 'yyyy-MM-dd')}</span>{' '}
							<span className='opacity-75'>{note.title}</span>
						</span>{' '}
					</Link>
				))}
			</>

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
