import getCourses from '@/actions/courses/get-courses';
import getNotes from '@/actions/notes/get-notes';
import { useQuery } from '@tanstack/react-query';

/**
 * Uses react query to get notes from the backend.
 */
const useNotes = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['notes'],
		queryFn: async () => {
			// if server action returns error message, throw it so it
			// is accessible as result of useQuery
			const { notes, error } = await getNotes();
			if (error) throw new Error(error);
			return { notes };
		},
		staleTime: Infinity,
	});
	return { notes: data?.notes, isPending, error };
};

export default useNotes;
