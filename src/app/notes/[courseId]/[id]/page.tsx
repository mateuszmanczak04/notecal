'use client';

import LoadingSpinner from '@/components/common/loading-spinner';
import DeleteNoteButton from '@/app/notes/_components/delete-note-button';
import NoteContent from '@/app/notes/_components/note-content';
import { NoteContextProvider } from '@/app/notes/_components/note-context';
import NoteTasksList from '@/app/notes/_components/note-tasks-list';
import NoteTeacher from '@/app/notes/_components/note-teacher';
import NoteTime from '@/app/notes/_components/note-time';
import NoteTitle from '@/app/notes/_components/note-title';
import NotesList from '@/app/notes/_components/notes-list';
import useNotes from '@/hooks/use-notes';
import { useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const NotePage = () => {
	const params = useParams();
	const queryClient = useQueryClient();
	const { notes } = useNotes();

	useEffect(() => {
		const id = params.id;
		const currentNote = notes?.filter(note => note.id === id)[0];
		if (!currentNote) {
			queryClient.invalidateQueries({ queryKey: ['notes'] });
		}
	}, [notes, params.id, queryClient]);

	return (
		<NoteContextProvider>
			<div className='min-w-screen-sm flex h-[calc(100vh-96px)] min-h-80 w-full gap-4 overflow-x-scroll p-4 scrollbar-hide'>
				<div className='flex h-full flex-1 flex-col'>
					<NoteTitle />
					<NoteTime />
					<NoteContent />
				</div>
				<div className='flex h-full w-48 shrink-0 flex-col gap-8 overflow-y-scroll scrollbar-hide'>
					<NotesList />
					<NoteTasksList />
					{/* todo - fetch real course teacher */}
					<NoteTeacher />
					<DeleteNoteButton />
				</div>
			</div>
		</NoteContextProvider>
	);
};

export default NotePage;
