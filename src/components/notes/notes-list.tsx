'use client';

import NewNoteButton from '@/components/notes/new-note-button';
import { useNoteContext } from '@/components/notes/note-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotesList = () => {
	const {
		course,
		notes,
		notesIsLoading: isLoading,
		notesError: error,
	} = useNoteContext();

	if (error) {
		return <p className='rounded-md bg-red-100 p-2 text-red-800'>{error}</p>;
	}

	if (isLoading) {
		return <p className='animate-bounce'>Loading...</p>;
	}

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Notes:</p>
			{notes?.map(note => (
				<Button key={note.id} variant='secondary' size='sm' asChild>
					<Link href={`/notes/${course?.id}/${note.id}`}>
						{note.startTime.toDateString()}
					</Link>
				</Button>
			))}
			<NewNoteButton />
		</div>
	);
};

export default NotesList;
