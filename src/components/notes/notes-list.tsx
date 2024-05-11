'use client';

import { getCourseNotes } from '@/actions/courses/get-course-notes';
import NewNoteButton from '@/components/notes/new-note-button';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FC } from 'react';

interface NotesListProps {
	courseId: string;
}

const NotesList: FC<NotesListProps> = ({ courseId }) => {
	const { data, isLoading, error, isError } = useQuery({
		queryFn: async () => await getCourseNotes({ courseId }),
		queryKey: ['notes', courseId],
	});

	if (data?.error) {
		return (
			<p className='rounded-md bg-red-100 p-2 text-red-800'>
				Error: {data?.error}
			</p>
		);
	}

	if (isLoading) {
		// todo - improve appearance
		return <p className='animate-bounce'>Loading...</p>;
	}

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Notes:</p>
			{data?.notes?.map(note => (
				<Button key={note.id} variant='secondary' size='sm' asChild>
					<Link href={`/notes/${courseId}/${note.id}`}>
						{note.startTime.toDateString()}
					</Link>
				</Button>
			))}
			<NewNoteButton courseId={courseId} />
		</div>
	);
};

export default NotesList;
