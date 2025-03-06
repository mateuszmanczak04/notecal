import { useQuery } from '@tanstack/react-query';
import { T_Note } from '../types';
import { BACKEND_DOMAIN } from '../utils/app-domain';
import { fromUTC } from '../utils/timezone';

export const useNotes = () => {
	const { data, ...rest } = useQuery({
		queryKey: ['notes'],
		queryFn: async () =>
			await fetch(`${BACKEND_DOMAIN}/api/notes`)
				.then(res => res.json())
				.then(data => (data.notes || []) as T_Note[])
				.catch(() => []),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
	});
	// Notes with time adjusted to the timezone
	const shiftedNotes = data?.map(note => ({
		...note,
		startTime: note.startTime ? fromUTC(new Date(note.startTime)) : null,
		endTime: note.endTime ? fromUTC(new Date(note.endTime)) : null,
	}));
	return { data: shiftedNotes, ...rest };
};
