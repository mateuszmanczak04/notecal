'use client';

import { useNoteContext } from '@/app/notes/_context/note-context';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useNotes from '../_hooks/use-notes';

const DeleteButton = () => {
	const { currentNote } = useNoteContext();
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);
	const { remove: removeNote } = useNotes();

	const confirmDeletion = () => {
		removeNote(currentNote.id);
		router.back();
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
		<Button variant='destructive' onClick={() => setIsDeleting(true)}>
			Delete this note
		</Button>
	);
};

export default DeleteButton;
