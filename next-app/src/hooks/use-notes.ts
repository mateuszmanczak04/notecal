import { fromUTC } from '@/utils/timezone';
import { Note } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';

export const useNotes = () => {
	const { data, ...rest } = useQuery({
		queryKey: ['notes'],
		queryFn: async () =>
			await fetch('/api/notes')
				.then(res => res.json())
				.then(data => (data.notes || []) as Note[])
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
