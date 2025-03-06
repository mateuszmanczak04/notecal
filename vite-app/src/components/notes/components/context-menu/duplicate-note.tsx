import { useMutation, useQueryClient } from '@tanstack/react-query';
import { File } from 'lucide-react';
import { ClassNameValue } from 'tailwind-merge';
import { Button } from '../../../../components/button';
import { toast } from '../../../../components/toast/use-toast';
import { T_Note } from '../../../../types';
import { cn } from '../../../../utils/cn';

type T_Props = {
	note: T_Note;
	className?: ClassNameValue;
	callback?: () => void;
};

const DuplicateNote = ({ note, className }: T_Props) => {
	const queryClient = useQueryClient();
	const { mutate } = useMutation({
		mutationFn: async () =>
			await fetch(`/api/notes/${note.id}/duplicate`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
			}).then(res => res.json()),
		// onMutate: () => {
		// 	const duplicatedNote = notes?.find(note => note.id === data.note.id);
		// 	if (!duplicatedNote) {
		// 		return;
		// 	}
		// 	queryClient.setQueryData(['notes'], (old: Note[]) =>
		// 		[
		// 			...old,
		// 			{
		// 				...duplicatedNote,
		// 				createdAt: new Date(),
		// 				id: Math.random().toString(),
		// 				title: duplicatedNote.title + ' (copy)',
		// 			},
		// 		].toSorted((a, b) => {
		// 			// Sort them by startTime if they have it, otherwise by createdAt
		// 			// The same as in get-notex.ts server action
		// 			if ((!a.startTime && !b.startTime) || (a.startTime && b.startTime && a.startTime === b.startTime)) {
		// 				return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
		// 			}
		// 			if (!a.startTime) {
		// 				return 1;
		// 			}
		// 			if (!b.startTime) {
		// 				return -1;
		// 			}
		// 			return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
		// 		}),
		// 	);
		// 	if (callback) {
		// 		callback();
		// 	}
		// }, // TODO
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	return (
		<Button
			onClick={() => mutate()}
			className={cn('dark:bg-neutral-600 dark:hover:bg-neutral-500', className)}
			variant='secondary'
		>
			<File className='size-5' />
			Duplicate note
		</Button>
	);
};

export default DuplicateNote;
