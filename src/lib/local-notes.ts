import { Note } from '@prisma/client';
import queryClient from './query-client';

const append = async (note: Note) => {
	await queryClient.setQueryData(['notes'], (prev: { notes: Note[] }) => {
		return {
			notes: [...prev.notes, note].toSorted((a, b) =>
				a.startTime > b.startTime ? 1 : -1,
			),
		};
	});
};

const update = async (id: string, properties: Object) => {
	await queryClient.setQueryData(['notes'], (prev: { notes: Note[] }) => {
		return {
			notes: prev.notes
				.map(note => {
					if (note.id === id) {
						return { ...note, ...properties };
					}
					return note;
				})
				.toSorted((a, b) => (a.startTime > b.startTime ? 1 : -1)),
		};
	});
};

const remove = async (id: string) => {
	await queryClient.setQueryData(['notes'], (prev: { notes: Note[] }) => {
		return {
			notes: prev.notes.filter(note => note.id !== id),
		};
	});
};

const LocalNotes = {
	append,
	update,
	remove,
};

export default LocalNotes;
