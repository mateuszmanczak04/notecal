import { Note } from '@prisma/client';
import { useNotes } from './use-notes';

export type T_NoteWithTime = Omit<Note, 'startTime' | 'endTime'> & {
	startTime: Date;
	endTime: Date;
};

/**
 * Get notes that have both start and end time.
 */
export const useNotesWithTime = () => {
	const { data: notes, ...rest } = useNotes();
	return {
		data: notes?.filter(note => {
			return note.startTime && note.endTime;
		}) as T_NoteWithTime[],
		...rest,
	};
};
