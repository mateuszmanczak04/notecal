import { useMutation, useQueryClient } from '@tanstack/react-query';
import { T_Note } from '../../../../types';
import { useToast } from '../../../toast/use-toast';

export const useUpdateNoteCourseId = ({ note, onSettledCallback }: { note: T_Note; onSettledCallback: () => void }) => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation({
		mutationFn: async (data: { courseId: string }) =>
			await fetch(`/api/notes/${note.id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ courseId: data.courseId }),
			}).then(res => res.json()),
		onMutate: data => {
			queryClient.setQueryData(['notes'], (prev: T_Note[]) => {
				return prev.map(n => {
					if (n.id === note.id) {
						return { ...n, courseId: data.courseId };
					}
					return n;
				});
			});
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
