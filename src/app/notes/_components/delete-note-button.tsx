'use client';

import { Button } from '@/components/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/dialog';
import { useToast } from '@/components/toast/use-toast';
import { cn } from '@/utils/cn';
import { Note } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import deleteNote from '../_actions/delete-note';

type Props = {
	note: Note;
};

const DeleteNoteButton = ({ note }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { mutate, isPending } = useMutation({
		mutationFn: deleteNote,
		onMutate: () => {
			// TODO: optimistic update
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});
	const router = useRouter();

	const handleDelete = () => {
		mutate({ id: note.id });
		router.push(`/notes?courseId=${note.courseId}`);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='destructive' className='rounded-md'>
					<Trash className='size-5' /> Delete note
				</Button>
			</DialogTrigger>
			<DialogContent className='border-transparent bg-white dark:bg-neutral-800'>
				<DialogHeader>
					<DialogTitle>Are you sure to delete this note?</DialogTitle>
					<DialogDescription>
						All the content of this note will be permanently erased, you cannot restore it later.
					</DialogDescription>
				</DialogHeader>
				<Button
					variant='destructive'
					className={cn(isPending && 'pointer-events-none opacity-50')}
					disabled={isPending}
					onClick={handleDelete}>
					<Trash className='size-5' /> Yes, delete
				</Button>
				<DialogClose asChild>
					<Button variant='secondary'>No, cancel</Button>
				</DialogClose>
			</DialogContent>
		</Dialog>
	);
};

export default DeleteNoteButton;
