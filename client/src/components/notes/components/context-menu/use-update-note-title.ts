import { useMutation, useQueryClient } from '@tanstack/react-query';
import { T_Note } from '../../../../types';
import { useToast } from '../../../toast/use-toast';

export const useUpdateNoteTitle = ({ note, onSettledCallback }: { note: T_Note; onSettledCallback: () => void }) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation({
		mutationFn: async (data: { title: string }) =>
			await fetch(`/api/notes/${note.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ title: data.title }),
			}).then(res => res.json()),
		onMutate: () => {
			// TODO: Optimistic updates
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
			onSettledCallback();
		},
	});
};
