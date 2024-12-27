import { useQuery } from '@tanstack/react-query';
import getNotes from '../notes/_actions/get-notes';

export const useNotes = () => {
	return useQuery({ queryKey: ['notes'], queryFn: getNotes, refetchOnMount: false, refetchOnWindowFocus: false });
};
