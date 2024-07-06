import queryClient from '@/lib/query-client';
import { Note } from '@prisma/client';

const updateNoteEndTimeLocal = (id: string, newEndTime: Date) => {
	queryClient.setQueryData(['notes'], (old: { notes: Note[] }) => {
		const oldNotes = old.notes;
		return {
			notes: oldNotes.map(note => {
				if (note.id === id) {
					return { ...note, endTime: newEndTime };
				}
				return note;
			}),
		};
	});
};

export default updateNoteEndTimeLocal;
