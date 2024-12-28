'use client';

import { Button } from '@/components/button';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import deleteNote from '../_actions/delete-note';

// TODO: move this functionality into top content toolbar

type Props = {
	id: string;
};

/**
 * After first click it shows a confirmation message if user is sure to delete it.
 */
const DeleteNoteButton = ({ id }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: deleteNote,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	const router = useRouter();
	const [isDeleting, setIsDeleting] = useState(false);

	const confirmDeletion = () => {
		mutate({ id });
		router.back();
	};

	if (isDeleting) {
		return (
			<div>
				<p>Are you sure?</p>
				<Button
					variant='destructive'
					onClick={confirmDeletion}
					className={cn('mt-4 w-full', isPending && 'pointer-events-none opacity-50')}
					aria-label='Yes, delete this note'
					disabled={isPending}>
					Yes
				</Button>
				<Button
					variant='secondary'
					className='mt-4 w-full'
					onClick={() => setIsDeleting(false)}
					aria-label='No, do not delete this note'>
					No, cancel
				</Button>
			</div>
		);
	}

	return (
		<article>
			<p className='text-xl font-semibold'>Delete this note</p>
			<Button variant='destructive' className='mt-2 w-full' onClick={() => setIsDeleting(true)}>
				<Trash2 className='h-4 w-4' />
				Delete this note
			</Button>
		</article>
	);
};

export default DeleteNoteButton;
