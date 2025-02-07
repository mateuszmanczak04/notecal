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
import deleteManyNotes from '../../_actions/delete-many-notes';

type Props = {
	notes: Note[];
	className?: ClassNameValue;
	onDelete: () => void;
};

const DeleteManyNotesButton = ({ notes, className, onDelete }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const { mutate, isPending } = useMutation({
		mutationFn: deleteManyNotes,
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			router.push(`/notes?courseId=${notes[0]?.courseId}`);
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});
	const router = useRouter();

	if (isDeleting) {
		return (
			<Button
				variant='destructive'
				onClick={() => mutate({ ids: notes.map(n => n.id) })}
				className={cn('rounded-md', className)}>
				<Trash className='size-5' /> Are you sure? {isPending && <LoadingSpinner className='size-4' />}
			</Button>
		);
	}

	return (
		<Button variant='destructive' onClick={() => setIsDeleting(true)} className={cn('rounded-md', className)}>
			<Trash className='size-5' /> Delete these notes
		</Button>
	);
};

export default DeleteManyNotesButton;
