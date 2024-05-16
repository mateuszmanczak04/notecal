'use client';

import { deleteNote } from '@/actions/notes/delete-note';
import { useNoteContext } from '@/components/notes/note-context';
import { Button } from '@/components/ui/button';
import { Note } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

const DeleteNoteButton = () => {
	const { currentNote } = useNoteContext();
	const queryClient = useQueryClient();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	const handleClick = () => {
		startTransition(async () => {
			await deleteNote({ id: currentNote.id });
			queryClient.setQueryData(['notes'], (old: { notes: Note[] }) => {
				return { notes: old.notes.filter(note => note.id !== currentNote.id) };
			});
			router.back();
		});
	};

	return (
		<Button variant='destructive' disabled={isPending} onClick={handleClick}>
			Delete this note
		</Button>
	);
};

export default DeleteNoteButton;
