'use client';

import { Button } from '@/components/button';
import LoadingSpinner from '@/components/loading-spinner';
import { useToast } from '@/components/toast/use-toast';
import { useNotes } from '@/hooks/use-notes';
import { cn } from '@/utils/cn';
import { Course } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import createNote from '../_actions/create-note';
import SideNote from './side-note';

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
		<article className='flex w-full flex-col'>
			<>
				{/* List of all notes from this course */}
				{currentCourseNotes.map(note => (
					<SideNote key={note.id} note={note} />
				))}
			</>

			{/* New note button */}
			<Button
				style={{ backgroundColor: currentCourse.color }}
				onClick={handleNewNote}
				className={cn(
					'w-full ',
					currentCourseNotes.length !== 0 && 'rounded-t-none',
					isPending && 'pointer-events-none opacity-50',
				)}
				disabled={isPending}>
				<Plus className='h-4 w-4' /> Create a new note {isPending && <LoadingSpinner className='size-4' />}
			</Button>
		</article>
	);
};

export default SideNotes;
