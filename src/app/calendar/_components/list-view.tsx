'use client';

import { useNotes } from '@/hooks/use-notes';

const ListView = () => {
	const { data: notes } = useNotes();

	return <div>{notes && notes.map(note => <div key={note.id}>{note.title}</div>)}</div>;
};

export default ListView;
