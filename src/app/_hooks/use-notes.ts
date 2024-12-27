import { fromUTC } from '@/utils/timezone';
import { useQuery } from '@tanstack/react-query';
import getNotes from '../notes/_actions/get-notes';

export const useNotes = () => {
	const { data, ...rest } = useQuery({
		queryKey: ['notes'],
		queryFn: getNotes,
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	// Notes with time adjusted to the timezone
	const shiftedNotes = data?.map(note => ({
		...note,
		startTime: fromUTC(note.startTime),
		endTime: fromUTC(note.endTime),
	}));
	return { data: shiftedNotes, ...rest };
};
