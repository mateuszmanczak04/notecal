'use client';

import NewNoteButton from '@/app/notes/_components/new-note-button';
import { useNoteContext } from '../_context/note-context';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const NotesList = () => {
	const { course, notes } = useNoteContext();

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Notes:</p>
			{notes?.map(note => (
				<Button
					key={note.id}
					variant='secondary'
					className='shadow-none'
					size='sm'
					asChild>
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
