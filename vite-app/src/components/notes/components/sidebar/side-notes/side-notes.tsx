import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';
import { Button } from '../../../../../components/button';
import LoadingSpinner from '../../../../../components/loading-spinner';
import { useToast } from '../../../../../components/toast/use-toast';
import { useClientSide } from '../../../../../hooks/use-client-side';
import { useNotes } from '../../../../../hooks/use-notes';
import { cn } from '../../../../../utils/cn';
import { useNoteContext } from '../../../context/note-context';
import { SelectNotesProvider } from './selected-notes-context';
import SideNoteItem from './side-note-item';

/**
 * List of links to all course's notes
 */
const SideNotes = () => {
	const { currentCourse } = useNoteContext();
	const queryClient = useQueryClient();
	const isClient = useClientSide();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { courseId: string }) =>
			await fetch(`/api/notes`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ courseId: data.courseId }),
			}).then(res => res.json()),
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	const handleNewNote = () => {
		if (!currentCourse) return;
		mutate({ courseId: currentCourse.id });
	};

	const { data: notes } = useNotes();

	const currentCourseNotes = notes?.filter(note => note.courseId === currentCourse?.id);

	return (
		<div className='flex flex-col border-b border-neutral-200 p-6 dark:border-neutral-700'>
			<p className='font-semibold'>Course notes</p>
			<p className='mb-4 mt-2 text-sm opacity-75'>List of all notes from this course</p>

			{isClient && currentCourseNotes && (
				<div className='flex flex-col gap-y-2'>
					<SelectNotesProvider>
						{currentCourseNotes.map(note => (
							<SideNoteItem key={note.id} note={note} />
						))}
					</SelectNotesProvider>
				</div>
			)}

			<Button
				style={{ backgroundColor: isClient ? currentCourse?.color : '' }}
				onClick={handleNewNote}
				className={cn('mt-2 transition-opacity', isPending && 'pointer-events-none opacity-50')}
				disabled={isPending}
			>
				<Plus className='size-5' /> Create a new note {isPending && <LoadingSpinner className='size-4' />}
			</Button>
		</div>
	);
};

export default SideNotes;
