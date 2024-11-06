'use client';

import { Button } from '@/components/ui/button';
import { Note } from '@prisma/client';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import useNotes from '../_hooks/use-notes';

type Props = {
	note: Note;
};

const DeleteButton = ({ note }: Props) => {
	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);
	const { remove: removeNote } = useNotes();

	const confirmDeletion = () => {
		removeNote(note.id);
		router.back();
	};

	if (isDeleting) {
		return (
			<div className='flex flex-col gap-2'>
				<p>Are you sure?</p>
				<Button
					variant='destructive'
					onClick={confirmDeletion}
					className='w-full'
					aria-label='yes, delete this note'
				>
					Yes
				</Button>
				<Button
					variant='secondary'
					className='w-full'
					onClick={() => setIsDeleting(false)}
					aria-label='no, do not delete this note'
				>
					No, cancel
				</Button>
			</div>
		);
	}

	return (
		<Button variant='destructive' onClick={() => setIsDeleting(true)}>
			<Trash2 className='h-4 w-4' />
			Delete this note
		</Button>
	);
};

export default DeleteButton;
