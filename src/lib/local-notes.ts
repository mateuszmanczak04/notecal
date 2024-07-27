import { Note } from '@prisma/client';
import queryClient from './query-client';

const remove = async (id: string) => {
	await queryClient.setQueryData(['notes'], (prev: { notes: Note[] }) => {
		return {
			notes: prev.notes.filter(note => note.id !== id),
		};
	});
};

const LocalNotes = {
	remove,
};

export default LocalNotes;
