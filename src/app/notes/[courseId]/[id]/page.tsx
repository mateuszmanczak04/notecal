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
			<div className='flex h-[calc(100vh-96px)] min-h-80 w-full min-w-[800px] gap-4 p-4'>
				<div className='flex h-full flex-1 flex-col'>
					<NoteTitle />
					<NoteTime />
					<NoteContent />
				</div>
				<div className='flex w-48 flex-col gap-8'>
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
