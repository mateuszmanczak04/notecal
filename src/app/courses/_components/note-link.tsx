'use client';

import { Button } from '@/components/ui/button';
import { Note } from '@prisma/client';
import { format } from 'date-fns';
import Link from 'next/link';
import { FC } from 'react';

interface NoteLinkProps {
	note: Note;
}

const NoteLink: FC<NoteLinkProps> = ({ note }) => {
	return (
		<Button
			variant='secondary'
			asChild
			aria-label={`link to note with date ${format(note.startTime, 'yyyy-MM-dd')}`}
			title={`link to note with date ${format(note.startTime, 'yyyy-MM-dd')}`}>
			<Link href={`/notes/${note.courseId}/${note.id}`} key={note.id}>
				{format(note.startTime, 'yyyy-MM-dd')}
			</Link>
		</Button>
	);
};

export default NoteLink;
