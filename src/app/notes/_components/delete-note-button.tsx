'use client';

import deleteNote from '@/app/notes/_actions/delete-note';
import { useNoteContext } from '@/app/notes/_context/note-context';
import { Button } from '@/components/ui/button';
import { Note } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const DeleteNoteButton = () => {
	const { currentNote } = useNoteContext();
	const queryClient = useQueryClient();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const confirmDeletion = () => {
		startTransition(async () => {
			await deleteNote({ id: currentNote.id });
			queryClient.setQueryData(['notes'], (old: { notes: Note[] }) => {
				return { notes: old.notes.filter(note => note.id !== currentNote.id) };
			});
			router.back();
			router.refresh();
		});
	};

	if (isDeleting) {
		return (
			<div className='flex flex-col gap-2'>
				<p>Are you sure?</p>
				<Button
					variant='destructive'
					onClick={confirmDeletion}
					className='w-full'>
					Yes
				</Button>
				<Button
					variant='secondary'
					className='w-full'
					onClick={() => setIsDeleting(false)}>
					No, cancel
				</Button>
			</div>
		);
	}

	return (
		<Button
			variant='destructive'
			disabled={isPending}
			onClick={() => setIsDeleting(true)}>
			Delete this note
		</Button>
	);
};

export default DeleteNoteButton;
