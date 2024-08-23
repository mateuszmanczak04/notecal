'use client';

import NewNoteButton from '@/app/notes/_components/new-note-button';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { StickyNote } from 'lucide-react';
import Link from 'next/link';
import { useNoteContext } from '../_context/note-context';

const SideNotes = () => {
	const { course, notes } = useNoteContext();

	return (
		<div className='flex flex-col gap-2'>
			<p className='text-xl font-semibold'>Notes:</p>
			{notes?.map(note => (
				<Button
					key={note.id}
					variant='secondary'
					asChild
					aria-label={`link to note with date ${format(note.startTime, 'yyyy-MM-dd')}`}
					title={`link to note with date ${format(note.startTime, 'yyyy-MM-dd')}`}>
					<Link href={`/notes/${course?.id}/${note.id}`}>
						<StickyNote />
						{format(note.startTime, 'yyyy-MM-dd')}
					</Link>
				</Button>
			))}
			<NewNoteButton />
		</div>
	);
};

export default SideNotes;
