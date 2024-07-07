import getNotes from '@/app/notes/_actions/get-notes';
import { useQuery } from '@tanstack/react-query';

const useNotes = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['notes'],
		queryFn: async () => {
			const { notes, error } = await getNotes();
			if (error) throw new Error(error);
			return { notes };
		},
	});
	return { notes: data?.notes, isPending, error };
};

export default useNotes;
