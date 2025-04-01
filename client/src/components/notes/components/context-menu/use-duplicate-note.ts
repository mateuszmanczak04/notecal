import { useMutation, useQueryClient } from '@tanstack/react-query';
import { T_Note } from '../../../../types';
import { useToast } from '../../../toast/use-toast';

export const useDuplicateNote = ({ note, onSettledCallback }: { note: T_Note; onSettledCallback: () => void }) => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async () =>
			await fetch(`/api/notes/${note.id}/duplicate`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			}).then(res => res.json()),
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
			onSettledCallback();
		},
	});
};
