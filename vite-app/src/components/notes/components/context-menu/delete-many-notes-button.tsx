import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Trash } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ClassNameValue } from 'tailwind-merge';
import { Button } from '../../../../components/button';
import LoadingSpinner from '../../../../components/loading-spinner';
import { useToast } from '../../../../components/toast/use-toast';
import { T_Note } from '../../../../types';
import { cn } from '../../../../utils/cn';

type Props = {
	notes: T_Note[];
	className?: ClassNameValue;
	onDelete: () => void;
};

const DeleteManyNotesButton = ({ notes, className }: Props) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const [isDeleting, setIsDeleting] = useState(false);
	const { mutate, isPending } = useMutation({
		mutationFn: async (data: { ids: string[] }) =>
			await fetch('/api/notes', { method: 'DELETE', body: JSON.stringify(data) }).then(res => res.json()),
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			navigate(`/notes?courseId=${notes[0]?.courseId}`);
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});
	const navigate = useNavigate();

	if (isDeleting) {
		return (
			<Button
				variant='destructive'
				onClick={() => mutate({ ids: notes.map(n => n.id) })}
				className={cn('rounded-md', className)}
			>
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
