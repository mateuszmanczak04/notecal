'use client';

import { Button } from '@/components/button';
import LoadingSpinner from '@/components/loading-spinner';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import deleteNote from '../_actions/delete-note';

type Props = {
	id: string;
};

/**
 * After first click it shows a confirmation message if user is sure to delete it.
 */
const DeleteNoteButton = ({ id }: Props) => {
	const [isPending, startTransition] = useTransition();

	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const confirmDeletion = () => {
		startTransition(async () => {
			await deleteNote({ id });
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
					className='w-full'
					aria-label='yes, delete this note'>
					{isPending && <LoadingSpinner />}
					Yes
				</Button>
				<Button
					variant='secondary'
					className='w-full'
					onClick={() => setIsDeleting(false)}
					aria-label='no, do not delete this note'>
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

export default DeleteNoteButton;
