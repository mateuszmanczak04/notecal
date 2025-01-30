'use client';

import { Button } from '@/components/button';
import { toast } from '@/components/toast/use-toast';
import { useNotes } from '@/hooks/use-notes';
import { cn } from '@/utils/cn';
import { Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ClassNameValue } from 'tailwind-merge';
import { duplicateNote, T_DuplicateNoteInput } from '../_actions/duplicate-note';

type T_Props = {
	note: Note;
	className?: ClassNameValue;
	callback?: () => void;
};

const DuplicateNote = ({ note, className, callback }: T_Props) => {
	const { data: notes } = useNotes();
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: duplicateNote,
		onMutate: (data: T_DuplicateNoteInput) => {
			const duplicatedNote = notes?.find(note => note.id === data.id);
			queryClient.setQueryData(['notes'], (old: Note[]) => [
				...old,
				{ ...duplicatedNote, id: Math.random().toString() },
			]);
			if (callback) {
				callback();
			}
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	return (
		<Button
			onClick={() => mutate({ id: note.id })}
			className={cn('dark:bg-neutral-600 dark:hover:bg-neutral-500', className)}
			variant='secondary'>
			Duplicate note
		</Button>
	);
};

export default DuplicateNote;
