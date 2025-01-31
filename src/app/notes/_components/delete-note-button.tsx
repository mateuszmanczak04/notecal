'use client';

import { Button } from '@/components/button';
import LoadingSpinner from '@/components/loading-spinner';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ClassNameValue } from 'tailwind-merge';
import deleteNote from '../_actions/delete-note';

type Props = {
	note: Note;
	className?: ClassNameValue;
};

const DeleteNoteButton = ({ note, className }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const { mutate, isPending } = useMutation({
		mutationFn: deleteNote,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			// If user is on the exact note page, redirect to the course page
			if (`${window.location.pathname}${window.location.search}` === `/notes?noteId=${note.id}`) {
				router.push(`/notes?courseId=${note.courseId}`);
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});
	const router = useRouter();

	if (isDeleting) {
		return (
			<Button
				variant='destructive'
				onClick={() => mutate({ id: note.id })}
				className={cn('rounded-md', className)}>
				<Trash className='size-5' /> Are you sure? {isPending && <LoadingSpinner className='size-4' />}
			</Button>
		);
	}

	return (
		<Button variant='destructive' onClick={() => setIsDeleting(true)} className={cn('rounded-md', className)}>
			<Trash className='size-5' /> Delete note
		</Button>
	);
};

export default DeleteNoteButton;
