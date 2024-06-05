'use client';

import DeleteNoteButton from '@/components/notes/delete-note-button';
import NoteContent from '@/components/notes/note-content';
import { NoteContextProvider } from '@/components/notes/note-context';
import NoteTasksList from '@/components/notes/note-tasks-list';
import NoteTeacher from '@/components/notes/note-teacher';
import NoteTime from '@/components/notes/note-time';
import NoteTitle from '@/components/notes/note-title';
import NotesList from '@/components/notes/notes-list';

const NotePage = () => {
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
