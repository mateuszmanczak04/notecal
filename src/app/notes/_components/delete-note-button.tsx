'use client';

import { Button } from '@/components/button';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import deleteNote from '../_actions/delete-note';

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
			<div className='flex flex-col gap-2'>
				<p>Are you sure?</p>
				<Button
					variant='destructive'
					onClick={confirmDeletion}
					className={cn('w-full', isPending && 'pointer-events-none opacity-50')}
					aria-label='yes, delete this note'
					disabled={isPending}>
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
		<article>
			<h2 className='text-2xl font-semibold'>Delete Note</h2>
			<p className=''>Delete this specific note permanently</p>

			<Button variant='destructive' className='mt-2 w-full' onClick={() => setIsDeleting(true)}>
				<Trash2 className='h-4 w-4' />
				Delete this note
			</Button>
		</article>
	);
};

export default DeleteNoteButton;
