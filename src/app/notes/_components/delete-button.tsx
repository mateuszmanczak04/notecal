'use client';

import deleteNote from '@/app/notes/_actions/delete-note';
import { useNoteContext } from '@/app/notes/_context/note-context';
import { Button } from '@/components/ui/button';
import LocalNotes from '@/lib/local-notes';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

const DeleteButton = () => {
	const { currentNote } = useNoteContext();
	const [isPending, startTransition] = useTransition();
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState<boolean>(false);

	const confirmDeletion = () => {
		startTransition(async () => {
			// TODO: optimistic updates
			deleteNote({ id: currentNote.id });
			await LocalNotes.remove(currentNote.id);
			router.back();
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

export default DeleteButton;
