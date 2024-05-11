'use client';

import { getNote } from '@/actions/notes/get-note';
import NoteContent from '@/components/notes/note-content';
import NoteTasksList from '@/components/notes/note-tasks-list';
import NoteTeacher from '@/components/notes/note-teacher';
import NoteTitle from '@/components/notes/note-title';
import NotesList from '@/components/notes/notes-list';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

const NotePage = () => {
	const { courseId, id } = useParams();
	const { data, isLoading, isError, error } = useQuery({
		queryFn: async () => await getNote({ id: id as string }),
		queryKey: ['notes', id],
	});

	if (data?.error) {
		// todo - improve appearance
		return (
			<p className='rounded-md bg-red-100 p-2 text-red-800'>
				Error: {data.error}
			</p>
		);
	}

	if (isLoading) {
		// todo - improve appearance
		return <p className='animate-bounce'>Loading...</p>;
	}

	if (data?.note) {
		return (
			<div className='flex w-full min-w-[800px] gap-4 p-4'>
				<div className='flex-1'>
					<NoteTitle courseId={data.note.courseId} date={data.note.startTime} />
					<NoteContent content={data.note.content || ''} />
				</div>
				<div className='flex w-48 flex-col gap-8'>
					<NotesList courseId={data.note.courseId} />
					<NoteTasksList courseId={data.note.courseId} />
					{/* todo - fetch real course teacher */}
					<NoteTeacher courseId={data.note.courseId} />
				</div>
			</div>
		);
	}
};

export default NotePage;
