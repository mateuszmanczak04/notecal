'use client';

import { getNote } from '@/actions/notes/get-note';
import NoteContent from '@/components/notes/note-content';
import { NoteContextProvider } from '@/components/notes/note-context';
import NoteTasksList from '@/components/notes/note-tasks-list';
import NoteTeacher from '@/components/notes/note-teacher';
import NoteTime from '@/components/notes/note-time';
import NoteTitle from '@/components/notes/note-title';
import NotesList from '@/components/notes/notes-list';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const NotePage = () => {
	return (
		<NoteContextProvider>
			<div className='min-w-screen-sm scrollbar-hide flex h-[calc(100vh-96px)] min-h-80 w-full gap-4 overflow-x-scroll p-4'>
				<div className='flex h-full flex-1 flex-col'>
					<NoteTitle />
					<NoteTime />
					<NoteContent />
				</div>
				<div className='scrollbar-hide flex h-full w-48 shrink-0 flex-col gap-8 overflow-y-scroll'>
					<NotesList />
					<NoteTasksList />
					{/* todo - fetch real course teacher */}
					<NoteTeacher />
				</div>
			</div>
		</NoteContextProvider>
	);
};

export default NotePage;
