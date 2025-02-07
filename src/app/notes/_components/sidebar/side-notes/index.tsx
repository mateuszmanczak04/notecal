'use client';

import createNote from '@/app/notes/_actions/create-note';
import { SelectNotesProvider } from '@/app/notes/_components/sidebar/side-notes/selected-notes-context';
import { Button } from '@/components/button';
import LoadingSpinner from '@/components/loading-spinner';
import { useToast } from '@/components/toast/use-toast';
import { useNotes } from '@/hooks/use-notes';
import { cn } from '@/utils/cn';
import { Course } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import SideNoteItem from './side-note-item';

type Props = {
	currentCourse: Course;
};

/**
 * List of links to all course's notes
 */
const SideNotes = ({ currentCourse }: Props) => {
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

	const { data: notes } = useNotes();

	if (!notes) return;

	const currentCourseNotes = notes.filter(note => note.courseId === currentCourse?.id);

	return (
		<div className='flex flex-col gap-y-2 border-b border-neutral-200 pb-4 dark:border-neutral-700'>
			<p className='px-2 font-semibold'>Course notes</p>

			<SelectNotesProvider>
				{currentCourseNotes.map(note => (
					<SideNoteItem key={note.id} note={note} />
				))}
			</SelectNotesProvider>

			<Button
				style={{ backgroundColor: currentCourse.color }}
				onClick={handleNewNote}
				className={cn(isPending && 'pointer-events-none opacity-50')}
				disabled={isPending}>
				<Plus className='size-5' /> Create a new note {isPending && <LoadingSpinner className='size-4' />}
			</Button>
		</div>
	);
};

export default SideNotes;
