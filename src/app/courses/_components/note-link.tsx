'use client';

import { Note } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';
import { FC } from 'react';

interface NoteLinkProps {
	note: Note;
}

const NoteLink: FC<NoteLinkProps> = ({ note }) => {
	return (
		<Link
			href={`/notes/${note.courseId}/${note.id}`}
			key={note.id}
			className='flex h-6 shrink-0 items-center justify-center text-nowrap rounded-md bg-neutral-100 px-4 transition hover:bg-neutral-200 dark:bg-neutral-700 dark:hover:bg-neutral-600'>
			{format(note.startTime, 'yyyy-MM-dd')}
		</Link>
	);
};

export default NoteLink;
