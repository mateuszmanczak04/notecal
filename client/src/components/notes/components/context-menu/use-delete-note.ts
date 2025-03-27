import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { T_Note } from '../../../../types';
import { useToast } from '../../../toast/use-toast';

export const useDeleteNote = ({ note }: { note: T_Note }) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const navigate = useNavigate();

	return useMutation({
		mutationFn: async () => await fetch(`/api/notes/${note.id}`, { method: 'DELETE' }).then(res => res.json()),
		onMutate: () => {
			// TODO: Optimistic updates
		},
		onSettled: data => {
			if (data && 'error' in data) {
				toast({ description: data.error, variant: 'destructive' });
			}
			// If user is on the exact note page, redirect to the course page
			if (`${window.location.pathname}${window.location.search}` === `/notes?noteId=${note.id}`) {
				navigate(`/notes?courseId=${note.courseId}`);
			}
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});
};
