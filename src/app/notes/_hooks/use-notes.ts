import getNotes from '@/app/notes/_actions/get-notes';
import { useMutation, useQuery } from '@tanstack/react-query';
import createNote from '../_actions/create-note';
import { Note } from '@prisma/client';
import queryClient from '@/lib/query-client';
import { z } from 'zod';
import updateNote from '../_actions/update-note';
import deleteNote from '../_actions/delete-note';

type CreateNoteSchema = {
	content: string;
	courseId: string;
	startTime: Date;
	endTime: Date;
};

type UpdateNoteSchema = {
	id: string;
	content?: string;
	courseId?: string;
	startTime?: Date;
	endTime?: Date;
};

type NoteWithLoading = Note & { loading?: boolean };

// Returns a temporary note with fake fields:
// extended by "loading: true" field:
const createTempNote = (values: CreateNoteSchema): NoteWithLoading => ({
	...values,
	id: crypto.randomUUID(),
	userId: '',
	loading: true,
});

const useNotes = () => {
	const { data, isPending, error } = useQuery({
		queryKey: ['notes'],
		queryFn: async () => {
			const { notes, error } = await getNotes();
			if (error) throw new Error(error);
			return notes;
		},
	});

	// Inserting
	const { mutate: add } = useMutation({
		mutationFn: async (values: CreateNoteSchema) => {
			const { newNote, error } = await createNote(values);
			if (error) throw new Error(error);
			return newNote;
		},
		onMutate: async (values: CreateNoteSchema) => {
			await queryClient.cancelQueries({ queryKey: ['notes'] });
			const previousNotes = queryClient.getQueryData(['notes']);

			const newTempNote = createTempNote(values);

			await queryClient.setQueryData(['notes'], (oldNotes: Note[]) =>
				[...oldNotes, newTempNote].toSorted((a, b) =>
					a.startTime > b.startTime ? 1 : -1,
				),
			);

			return previousNotes;
		},
		onError: (_err, _variables, context) => {
			// Rollback previous state
			queryClient.setQueryData(['notes'], context);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	// Updating
	const { mutate: update } = useMutation({
		mutationFn: async (values: UpdateNoteSchema) => {
			const { updatedNote, error } = await updateNote(values);
			if (error) throw new Error(error);
			return updatedNote;
		},
		onMutate: async (values: UpdateNoteSchema) => {
			await queryClient.cancelQueries({ queryKey: ['notes'] });
			const previousNotes = queryClient.getQueryData(['notes']);

			await queryClient.setQueryData(['notes'], (oldNotes: Note[]) => {
				return oldNotes
					.map(note => {
						if (note.id === values.id) {
							return { ...note, ...values };
						}
						return note;
					})
					.toSorted((a, b) => (a.startTime > b.startTime ? 1 : -1));
			});

			return previousNotes;
		},
		onError: (_err, _variables, context) => {
			// Rollback previous state
			queryClient.setQueryData(['notes'], context);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	// Deleting
	const { mutate: remove } = useMutation({
		mutationFn: async (id: string) => {
			const { error } = await deleteNote({ id });
			if (error) throw new Error(error);
			return id;
		},
		onMutate: async (id: string) => {
			await queryClient.cancelQueries({ queryKey: ['notes'] });
			const previousNotes = queryClient.getQueryData(['notes']);

			await queryClient.setQueryData(['notes'], (oldNotes: Note[]) => {
				return oldNotes.filter(note => {
					if (note.id === id) {
						return null;
					}
					return note;
				});
			});

			return previousNotes;
		},
		onError: (_err, _variables, context) => {
			// Rollback previous state
			queryClient.setQueryData(['notes'], context);
		},
		onSettled: async () => {
			return await queryClient.invalidateQueries({ queryKey: ['notes'] });
		},
	});

	return { notes: data, isPending, error, add, update, remove };
};

export default useNotes;
