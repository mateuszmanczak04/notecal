import getNotes from '@/app/notes/_actions/get-notes';
import { useMutation, useQuery } from '@tanstack/react-query';
import createNote from '../_actions/create-note';
import { Note } from '@prisma/client';
import queryClient from '@/lib/query-client';
import { z } from 'zod';

type CreateNoteSchema = {
	content: string;
	courseId: string;
	startTime: Date;
	endTime: Date;
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

	const { mutate: addNewNote } = useMutation({
		mutationFn: async (values: CreateNoteSchema) => {
			const { newNote, error } = await createNote(values);
			if (error) throw new Error(error);
			return newNote;
		},
		onMutate: async (values: CreateNoteSchema) => {
			await queryClient.cancelQueries({ queryKey: ['notes'] });
			const previousNotes = queryClient.getQueryData(['notes']);

			const newTempNote = createTempNote(values);

			queryClient.setQueryData(['notes'], (oldNotes: Note[]) => [
				...oldNotes,
				newTempNote,
			]);

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

	return { notes: data, isPending, error, addNewNote };
};

export default useNotes;
