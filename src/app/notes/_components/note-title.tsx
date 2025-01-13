'use client';

import { Note } from '@prisma/client';

type Props = {
	note: Note;
};

const NoteTitle = ({ note }: Props) => {
	return (
		<div>
			Title:
			{note.title}
		</div>
	);
};

export default NoteTitle;
