import queryClient from '@/lib/query-client';
import { Note } from '@prisma/client';

const updateNoteEndTimeLocal = (
	id: string,
	courseId: string,
	newEndTime: Date,
) => {
	queryClient.setQueryData(
		['course-notes', courseId],
		(old: { notes: Note[] }) => {
			const oldNotes = old.notes;
			return {
				notes: oldNotes.map(note => {
					if (note.id === id) {
						return { ...note, endTime: newEndTime };
					}
					return note;
				}),
			};
		},
	);
};

export default updateNoteEndTimeLocal;
